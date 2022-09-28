package learn.game_finder.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                //casual viewer
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/create_account").permitAll()
                .antMatchers("/refresh_token").authenticated()

                // authenticated user
                .antMatchers(HttpMethod.GET, "/location", "/location/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/game", "/game/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/user", "/user/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/pickup", "/pickup/*", "/pickup/game/*", "/pickup/location/*", "/pickup/user/*")
                    .hasAnyRole("USER", "ADMIN")

                .antMatchers(HttpMethod.POST, "/location").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/game").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/user").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/pickup").hasAnyRole("USER", "ADMIN")

                .antMatchers(HttpMethod.PUT, "/location/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/game/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/user/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/pickup/*").hasAnyRole("USER", "ADMIN")

                //admin
                .antMatchers(HttpMethod.DELETE, "/location/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/game/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/user/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/pickup/*").hasAnyRole("ADMIN")

                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}