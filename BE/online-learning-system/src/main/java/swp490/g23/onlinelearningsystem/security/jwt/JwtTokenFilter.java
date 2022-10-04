package swp490.g23.onlinelearningsystem.security.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.PermissionRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.errorhandling.ErrorMessage;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private PermissionRepositories permissionRepositories;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("URI 2 :  " + request.getQueryString());
        System.out.println("URI :  " + request.getRequestURI());
        System.out.println("METHOD :  " + request.getMethod());
        if (!hasAuthorizationHeader(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = getAccessToken(request);
        if (!jwtTokenUtil.validateAccessToken(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (userAuthorization(accessToken, request.getRequestURI(), request.getMethod()) == false) {
            ErrorMessage message = new ErrorMessage(10105, "Access denied");
            responseToClient(response, message, HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        setAuthenticationContext(accessToken, request);
        filterChain.doFilter(request, response);

    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(accessToken);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,
                null, userDetails.getAuthorities());
        System.out.println("PERMISSION : " + userDetails.getAuthorities().toString());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private boolean userAuthorization(String accessToken, String url, String method) {
        User user = new User();

        Claims claims = jwtTokenUtil.parseClaims(accessToken);

        String claimsRole = (String) claims.get("roles");
        System.out.println("claimroles : " + claimsRole);
        claimsRole = claimsRole.replace("[", "").replace("]", "");
        String[] roles = claimsRole.split(", ");

        for (String role : roles) {
            if (settingRepositories.findActiveSettingByValue(role) != null) {
                user.addRole(settingRepositories.findActiveSettingByValue(role));
            }
        }

        if (url.matches("/api/.+")) {
            String route = url.split("[/]")[2];
            System.out.println("rawURL" + route.toString());
            url = Setting.API_PREFIX + "/" + route;
            System.out.println("moddURL " + url.toString());
        }

        boolean canAccess = false;
        if (!permissionRepositories.findByScreen(settingRepositories.findActiveSettingByValue(url)).isEmpty()) {
            List<SettingPermission> list = permissionRepositories.findAll();

            for (SettingPermission permission : list) {
                for (Setting role : user.getSettings()) {

                    if (permission.getRole().getSettingValue().equals(role.getSettingValue())
                            && permission.getScreen().getSettingValue().equals(url)) {

                        System.out.println(
                                role.getSettingValue() + " claimsRole " + permission.getScreen().getSettingValue());

                        if (method.equalsIgnoreCase("GET") && permission.isCanGetAll()) {
                            canAccess = true;
                            break;
                        }

                        if (method.equalsIgnoreCase("PUT") && permission.isCanEdit()) {
                            canAccess = true;
                            break;
                        }

                        if (method.equalsIgnoreCase("POST") && permission.isCanAdd()) {
                            canAccess = true;
                            break;
                        }

                        if (method.equalsIgnoreCase("DELETE") && permission.isCanDelete()) {
                            canAccess = true;
                            break;
                        }
                    }
                }

            }
        } else {
            canAccess = true;
        }

        return canAccess;
    }

    private UserDetails getUserDetails(String accessToken) {
        User user = new User();

        Claims claims = jwtTokenUtil.parseClaims(accessToken);

        String claimsRole = (String) claims.get("roles");
        System.out.println("claimroles : " + claimsRole);
        claimsRole = claimsRole.replace("[", "").replace("]", "");
        String[] roles = claimsRole.split(", ");

        for (String role : roles) {
            if (settingRepositories.findActiveSettingByValue(role) != null) {
                user.addRole(settingRepositories.findActiveSettingByValue(role));
            }
        }

        // String subject = (String) claims.get(Claims.SUBJECT);
        String[] subjectArray = jwtTokenUtil.getSubject(accessToken).split(",");
        user.setUserId(Long.parseLong(subjectArray[0]));
        user.setEmail(subjectArray[1]);

        return user;
    }

    private boolean hasAuthorizationHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        System.out.println("autho header: " + header);

        if (ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")) {
            return false;
        }
        return true;
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        System.out.println("Access token: " + token);
        return token;
    }

    private void responseToClient(HttpServletResponse response, ErrorMessage customError, int httpStatus)
            throws IOException {

        response.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        response.setStatus(httpStatus);
        Map<String, ErrorMessage> map = new HashMap<>();
        map.put("error", customError);
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(Include.NON_NULL);
        response.getOutputStream().print(mapper.writeValueAsString(map));
        response.flushBuffer();
    }

}
