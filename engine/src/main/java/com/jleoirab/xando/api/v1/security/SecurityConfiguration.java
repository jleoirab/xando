package com.jleoirab.xando.api.v1.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/v1/game/**")
                .authenticated()
                .antMatchers(HttpMethod.POST, "/v1/player")
                .permitAll()
                .antMatchers("/swagger-ui/**")
                .permitAll()
                .antMatchers("/v3/api-docs/**")
                .permitAll()
                .anyRequest()
                .denyAll()
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
