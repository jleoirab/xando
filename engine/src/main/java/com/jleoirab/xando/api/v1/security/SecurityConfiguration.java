package com.jleoirab.xando.api.v1.security;

import com.jleoirab.xando.api.v1.security.authentication.Http401UnauthorizedEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.Filter;

/** Created by jleoirab on 2021-02-13 */
@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("tokenBasedAuthenticationFilter")
    Filter tokenBasedAuthenticationFilter;

    @Autowired
    @Qualifier("authenticationProvider")
    AuthenticationProvider authenticationProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authenticationProvider(authenticationProvider)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers("/swagger-ui/**").permitAll()
                    .antMatchers("/v3/api-docs/**").permitAll()
                    .antMatchers(HttpMethod.POST, "/v1/players").permitAll()
                    .antMatchers("/v1/**").authenticated()
                    .anyRequest().denyAll()
                .and()
                .addFilterBefore(tokenBasedAuthenticationFilter, BasicAuthenticationFilter.class)
                .exceptionHandling()
                    .authenticationEntryPoint(new Http401UnauthorizedEntryPoint())
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .logout().disable();
    }
}
