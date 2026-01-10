//package org.cjlee.auto.autojoosik.config;
//
//import com.gmedia.dangjintims.manager.login.LoginService;
//import com.gmedia.dangjintims.manager.login.bean.SessionUserInfo;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.JwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.annotation.PostConstruct;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.SecretKey;
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Component
//@RequiredArgsConstructor
//public class JwtTokenProvider {
//  private final Logger logger = LoggerFactory.getLogger(this.getClass());
//
//  private final LoginService loginService;
//
//  private final CProperties properties;
//
//  private SecretKey secretKey;
//
//  @PostConstruct
//  public void init() {
//    //var secret = Base64.getEncoder().encodeToString(this.jwtProperties.getSecretKey().getBytes());
//    this.secretKey = Keys.hmacShaKeyFor(properties.getJwt().getSecret().getBytes(StandardCharsets.UTF_8));
//  }
//
//
//
//
//  private Integer getTokenExpirationTime(Integer expirationTime) {
//    return 1000 * 60 * expirationTime;
//  }
//
//  // token으로 사용자 id 조회
//  public String getUsernameFromToken(String token) {
////    return Jwts.parser().setSigningKey(properties.getJwt().getSecret()).parseClaimsJws(token).getBody().getSubject();
//    return getClaimFromToken(token, Claims::getId);
//  }
//
//  // token으로 사용자 속성정보 조회
//  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
//    final Claims claims = getAllClaimsFromToken(token);
//    return claimsResolver.apply(claims);
//  }
//
//  // 모든 token에 대한 사용자 속성정보 조회
//  private Claims getAllClaimsFromToken(String token) {
//    return Jwts.parser().verifyWith(this.secretKey).build().parseSignedClaims(token).getPayload();
//  }
//
//  public SessionUserInfo parseTokenBody(String token){
//    Claims claims = Jwts.parser().verifyWith(this.secretKey).build().parseSignedClaims(token).getPayload();
//
//    return new SessionUserInfo().builder()
//        .userSq(Long.parseLong(claims.get("userSq").toString()))
//        .loginId((String) claims.get("loginId"))
//        .loginIp((String) claims.get("loginIp"))
//        .roleSq(Long.parseLong(claims.get("roleSq").toString()))
//        .build();
//  }
//
//  // 토근 만료 여부 체크
//	/*
//	private Boolean isTokenExpired(String token) {
//		final Date expiration = getExpirationDateFromToken(token);
//		return expiration.before(new Date());
//	}
//	*/
//
//  // 토큰 만료일자 조회
////  public Date getExpirationDateFromToken(String token) {
////    return getClaimFromToken(token, Claims::getExpiration);
////  }
//
//  // id를 입력받아 accessToken 생성
////  public String generateAccessToken(String id) {
////    return generateAccessToken(id, new HashMap<>());
////  }
//
//  // id, 속성정보를 이용해 accessToken 생성
////  public String generateAccessToken(String id, Map<String, Object> claims) {
////    return doGenerateAccessToken(id, claims);
////  }
//
//  // JWT accessToken 생성
////  private String doGenerateAccessToken(String id, Map<String, Object> claims) {
////    String accessToken = Jwts.builder()
////        .setClaims(claims)
////        .setId(id)
////        .setIssuedAt(new Date(System.currentTimeMillis()))
////        .setExpiration(new Date(System.currentTimeMillis() + this.getTokenExpirationTime()))
////        .signWith(SignatureAlgorithm.HS512, properties.getJwt().getSecret())
////        .compact();
////
////    return accessToken;
////  }
//
//  // id를 입력받아 accessToken 생성
////  public String generateRefreshToken(String id) {
////    return doGenerateRefreshToken(id);
////  }
//
//  // JWT accessToken 생성
////  private String doGenerateRefreshToken(String id) {
////    String refreshToken = Jwts.builder()
////        .setId(id)
////        .setExpiration(new Date(System.currentTimeMillis() + this.getTokenExpirationTime() * 2))
////        .setIssuedAt(new Date(System.currentTimeMillis()))
////        .signWith(SignatureAlgorithm.HS512, properties.getJwt().getSecret())
////        .compact();
////
////    return refreshToken;
////  }
//
//  // id를 입력받아 accessToken, refreshToken 생성
////    public Map<String, String> generateTokenSet(String id) {
////        return generateTokenSet(id, new HashMap<>());
////    }
//
//  // id, 속성정보를 이용해 accessToken, refreshToken 생성
//  public Map<String, String> createTokenWithIp(String loginId, String loginIp, HttpServletRequest req, HttpServletResponse res) throws UnsupportedEncodingException {
//    SessionUserInfo userEnt = loginService.getSessionUserInfo(loginId);
//
//    Map<String, Object> claims = new HashMap<>();
//    claims.put("userSq",userEnt.getUserSq().toString());
//    claims.put("loginId",userEnt.getLoginId());
//    claims.put("roleSq",userEnt.getRoleSq().toString());
//    claims.put("loginIp", loginIp);
//
//    Map<String, String> tokens = this.generateTokenSetToEncode(loginId, claims);
//    String accessToken = tokens.get("accessToken");
//    String refreshToken = tokens.get("refreshToken");
//
////    UserEntity userEnt = loginService.getUserInfo(id);
////    loginService.tokenUpdate(userEnt, accessToken, refreshToken);
//
//    Cookie cookieAccess = new Cookie(properties.getJwt().getAccessHeader(), accessToken);
//    cookieAccess.setPath("/");
//    cookieAccess.setMaxAge(60 * 60 * properties.getJwt().getAccessTimeoutMin());
//    cookieAccess.setHttpOnly(true);
//    res.addCookie(cookieAccess);
//
//    Cookie cookieRefresh = new Cookie(properties.getJwt().getRefreshHeader(), refreshToken);
//    cookieRefresh.setPath("/");
//    cookieRefresh.setMaxAge(60 * 60 * properties.getJwt().getRefreshTimeoutMin());
//    cookieRefresh.setHttpOnly(true);
//    res.addCookie(cookieRefresh);
//
//    return tokens;
//  }
//
//  public Map<String, String> createToken(String loginId, HttpServletRequest req, HttpServletResponse res) throws UnsupportedEncodingException {
//    String ip = req.getHeader("X-FORWARDED-FOR");
//    if (ip == null) {
//      ip = req.getRemoteAddr();
//    }
//
//    return this.createTokenWithIp(loginId, ip, req, res);
//  }
//
//  public Map<String, String> generateTokenSetToEncode(String id, Map<String, Object> claims) throws UnsupportedEncodingException {
//    Map<String, String> valMap = this.doGenerateTokenSet(id, claims);
//    valMap.put("accessToken", URLEncoder.encode(valMap.get("accessToken"), "utf-8"));
//    valMap.put("refreshToken", URLEncoder.encode(valMap.get("refreshToken"), "utf-8"));
//    return doGenerateTokenSet(id, claims);
//  }
//
//  // JWT accessToken, refreshToken 생성
//  private Map<String, String> doGenerateTokenSet(String id, Map<String, Object> claims) {
//    Map<String, String> tokens = new HashMap<String, String>();
//
//    String accessToken = Jwts.builder()
//        .claims(claims)
//        .id(id)
//        .issuedAt(new Date(System.currentTimeMillis()))
//        .expiration(new Date(System.currentTimeMillis() + this.getTokenExpirationTime(properties.getJwt().getAccessTimeoutMin())))
//        .signWith(this.secretKey, Jwts.SIG.HS512)
//        .compact();
//
//    String refreshToken = Jwts.builder()
//        .id(id)
//        .expiration(new Date(System.currentTimeMillis() + this.getTokenExpirationTime(properties.getJwt().getRefreshTimeoutMin())))
//        .issuedAt(new Date(System.currentTimeMillis()))
//        .signWith(this.secretKey, Jwts.SIG.HS512)
//        .compact();
//
//    tokens.put("accessToken", accessToken);
//    tokens.put("refreshToken", refreshToken);
//    return tokens;
//  }
//
//  // JWT refreshToken 만료체크 후 재발급
////  public Boolean reGenerateRefreshToken(String loginId) {
////    logger.info("[reGenerateRefreshToken] refreshToken 재발급 요청");
////
////    UserEntity userEnt = loginService.getUserInfo(loginId);
////    if (userEnt == null || userEnt.getTokenRefresh() == null) {
////      logger.info("[reGenerateRefreshToken] refreshToken 정보가 존재하지 않습니다.");
////      return false;
////    }
////
////    // refreshToken 만료 여부 체크
////    try {
////      String refreshToken = userEnt.getTokenRefresh();
////      Jwts.parser().setSigningKey(properties.getJwt().getSecret()).parseClaimsJws(refreshToken);
////      logger.info("[reGenerateRefreshToken] refreshToken이 만료되지 않았습니다.");
////      return true;
////    }
////    // refreshToken이 만료된 경우 재발급
////    catch (ExpiredJwtException e) {
////      userEnt.setTokenRefresh(generateRefreshToken(loginId));
////      // ... DB에서 refreshToken 정보 수정
////      logger.info("[reGenerateRefreshToken] refreshToken 재발급 완료 : {}", generateRefreshToken(loginId));
////      return true;
////    }
////    // 그 외 예외처리
////    catch (Exception e) {
////      logger.error("[reGenerateRefreshToken] refreshToken 재발급 중 문제 발생 : {}", e.getMessage());
////      return false;
////    }
////  }
//
//  // 토근 검증
//  public boolean validateToken(String token) {
//    try {
//      Jws<Claims> claims = Jwts
//          .parser().verifyWith(this.secretKey).build()
//          .parseSignedClaims(token);
//      //  parseClaimsJws will check expiration date. No need do here.
//      logger.debug("expiration date: {}", claims.getPayload().getExpiration());
//      return true;
//    } catch (JwtException | IllegalArgumentException e) {
//      logger.error("Invalid JWT token: {}", e.getMessage());
//    }
//    return false;
//  }
//
//}
