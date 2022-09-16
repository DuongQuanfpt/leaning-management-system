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

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if(!hasAuthorizationHeader(request)){            
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = getAccessToken(request);
        if(!jwtTokenUtil.validateAccessToken(accessToken)){
            filterChain.doFilter(request, response);
            return;
        }
        
        setAuthenticationContext(accessToken,request);
        filterChain.doFilter(request, response);  
    }
    
    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(accessToken);

        UsernamePasswordAuthenticationToken authenticationToken 
            = new UsernamePasswordAuthenticationToken(userDetails, null,null);

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);    
    }

    private UserDetails getUserDetails(String accessToken) {
        User user = new User();
        String[] subjectArray =jwtTokenUtil.getSubject(accessToken).split(",");

        user.setUserId(Long.parseLong(subjectArray[0]));
        user.setEmail(subjectArray[1]);
        return null;
    }

    private boolean hasAuthorizationHeader(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        System.out.println("autho header: "+header);

        if(ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")){
            return false;
        }
        return true;
    }

    private String getAccessToken(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        System.out.println("Access token: "+token);
        return token;
    }
}
