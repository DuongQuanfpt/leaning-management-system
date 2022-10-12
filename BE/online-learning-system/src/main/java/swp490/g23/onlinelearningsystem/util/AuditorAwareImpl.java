package swp490.g23.onlinelearningsystem.util;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // TODO Auto-generated method stub
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        UserDetails uDetails =  (UserDetails) authentication.getPrincipal();
        System.out.println("EDITOR : " + uDetails.getUsername());
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        return Optional.of(uDetails.getUsername());
    }

}
