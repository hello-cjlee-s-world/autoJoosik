package org.cjlee.auto.autojoosik.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  // 인증되지 않은 사용자 접근에 대한 handler
//  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  // JWT 요청 처리 필터
//  private final JwtRequestFilter jwtRequestFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.httpBasic().disable();
//    http.csrf().disable();


//    //http.httpBasic().disable(); // 일반적인 루트가 아닌 다른 방식으로 요청시 거절, header에 id, pw가 아닌 token(jwt)을 달고 간다. 그래서 basic이 아닌 bearer를 사용한다.
    http
      .csrf(csrf -> csrf.disable())
              .cors(Customizer.withDefaults())
              .authorizeHttpRequests(auth -> auth
                      .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                      .anyRequest().permitAll()
              )
              .formLogin(form -> form.disable())
              .httpBasic(basic -> basic.disable());

      return http.build();
  }
}
