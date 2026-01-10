//package org.cjlee.auto.autojoosik.config;
//
//import com.gmedia.dangjintims.manager.login.LoginService;
//import com.gmedia.dangjintims.manager.login.bean.SessionUserInfo;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.util.AntPathMatcher;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.*;
//
//
//@Component
//@RequiredArgsConstructor
//public class JwtRequestFilter extends OncePerRequestFilter {
//  private final Logger log = LoggerFactory.getLogger(this.getClass());
//
//  // 실제 JWT 검증을 실행하는 Provider
//  private final JwtTokenProvider jwtTokenProvider;
//
//  private final CProperties properties;
//
//  private final LoginService loginService;
//
//  // 인증에서 제외할 url
//  private Set<String> skipUrls = new HashSet<>(Arrays.asList(
//      "/sso-test",
//      "/sso-login",
//      "/login",
//      "/login/**",
//      "/login/**/**",
//      "/wc/**",
//      "/wc/**/**",
//      "/app/**",
//      "/app/**/**",
//      "/resources/**"
//  ));
//  private AntPathMatcher pathMatcher = new AntPathMatcher();
//
//
//  @Override
//  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//      throws ServletException, IOException {
//
//    String accessToken = null;
//    String refreshToken = null;
//    String loginId = null;
//
//    try{
//      accessToken = Arrays.stream(request.getCookies())
//          .filter(c -> c.getName().equals(properties.getJwt().getAccessHeader()))
//          .findFirst().map(Cookie::getValue)
//          .orElse(null);
//
//      refreshToken = Arrays.stream(request.getCookies())
//          .filter(c -> c.getName().equals(properties.getJwt().getRefreshHeader()))
//          .findFirst().map(Cookie::getValue)
//          .orElse(null);
//    }
//    catch (Exception e){
//      e.printStackTrace();
//    }
//
//
//
//
//
//
//    if (accessToken != null && refreshToken != null) {
//      if (jwtTokenProvider.validateToken(accessToken)) {
//        loginId = jwtTokenProvider.getUsernameFromToken(accessToken);
//      } else {
//        if (jwtTokenProvider.validateToken(refreshToken)) {
//          loginId = jwtTokenProvider.getUsernameFromToken(refreshToken);
//          Map<String, String> tokens = jwtTokenProvider.createToken(loginId, request, response);
//          accessToken = tokens.get("accessToken");
//          refreshToken = tokens.get("refreshToken");
//        }
//      }
//
//      if (loginId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//        Collection<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();
//        roles.add(new SimpleGrantedAuthority("ROLE_USER"));
//        SessionUserInfo ss = jwtTokenProvider.parseTokenBody(accessToken);
////        SessionUserInfo ss = loginService.getUserSessionInfo(loginId);
//
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, loginId, roles);
//        authenticationToken.setDetails(ss);
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//      }
//    }
//
//    filterChain.doFilter(request, response);
//  }
//
//  // Filter에서 제외할 URL 설정
//  @Override
//  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//    return skipUrls.stream().anyMatch(p -> pathMatcher.match(p, request.getServletPath()));
//  }
//
//}
