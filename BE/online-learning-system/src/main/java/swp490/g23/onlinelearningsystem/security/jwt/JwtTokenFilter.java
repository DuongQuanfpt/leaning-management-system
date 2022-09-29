package swp490.g23.onlinelearningsystem.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.EnumEntity.PermisionEnum;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("URIIIIIII :  " + request.getRequestURI());
        if (!hasAuthorizationHeader(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = getAccessToken(request);
        if (!jwtTokenUtil.validateAccessToken(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }

        setAuthenticationContext(accessToken, request);
        filterChain.doFilter(request, response);
    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(accessToken, request.getRequestURI().toString());

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,
                null, userDetails.getAuthorities());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private UserDetails getUserDetails(String accessToken, String url) {
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
        user.addPermission(PermisionEnum.GET_ALL);
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

}
