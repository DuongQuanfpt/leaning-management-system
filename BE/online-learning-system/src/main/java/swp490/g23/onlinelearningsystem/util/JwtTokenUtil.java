package swp490.g23.onlinelearningsystem.util;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Component
public class JwtTokenUtil {
    private static final long EXPIRE_DURATION = 1 * 60 * 60 * 1000; // 1h
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);

    @Value("${app.jwt.secret}")
    private String secretKey;

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUserId() + "," + user.getEmail())
                .claim("roles", user.getSettings().toString())
                .setIssuer("G23")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            LOGGER.error("JWT expired", e);
        } catch (IllegalArgumentException ex) {
            LOGGER.error("Token is null, empty or has only whitespace", ex);
        } catch (MalformedJwtException ex) {
            LOGGER.error("Jwt is invalid", ex);
        } catch (UnsupportedJwtException ex) {
            LOGGER.error("JWT is not supported", ex);
        } catch (SignatureException ex) {
            LOGGER.error("Signature validation failed", ex);
        }
        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    public Claims parseClaims(String token) {
        return Jwts.parser()
                   .setSigningKey(secretKey)
                   .parseClaimsJws(token)
                   .getBody()
        ;
    }
}
