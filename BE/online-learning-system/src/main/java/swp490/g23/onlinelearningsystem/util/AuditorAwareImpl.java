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
    
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        if(authentication.getPrincipal().equals("anonymousUser")){
            return Optional.of("anonymousUser");
        }
        UserDetails uDetails = (UserDetails) authentication.getPrincipal();

        return Optional.of(uDetails.getUsername());
    }

}
