package swp490.g23.onlinelearningsystem.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.security.jwt.JwtTokenFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder (){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.userDetailsService(username -> userRepository.findByEmail(username)
           .orElseThrow(() -> new UsernameNotFoundException("User "+username+" not found "))
       );
    }

    @Override @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
      
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
     
       http.csrf().disable();
       http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
       http.exceptionHandling().authenticationEntryPoint((request,response,ex) -> {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,ex.getMessage());
       });
       http.authorizeRequests().antMatchers("/auth/login").permitAll()
                               .antMatchers("/user/register").permitAll()
                               .anyRequest().authenticated();
       http.addFilterBefore(jwtTokenFilter,UsernamePasswordAuthenticationFilter.class);                        
    ;

    }
    
}