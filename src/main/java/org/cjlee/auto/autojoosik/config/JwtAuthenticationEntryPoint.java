//package org.cjlee.auto.autojoosik.config;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.cjlee.auto.autojoosik.common.ResponseResult;
//import org.springframework.http.MediaType;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//@Component
//public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
//  @Override
//  public void commence(HttpServletRequest request, HttpServletResponse response,
//                       AuthenticationException authException) throws IOException, ServletException {
////    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "UnAuthorizedaaa");
//    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
//    org.cjlee.auto.autojoosik.common.ResponseResult result = new ResponseResult();
//    result.setStatus(org.cjlee.auto.autojoosik.common.ResponseResult.RESULT_FAIL_AUTH);
//    final ObjectMapper mapper = new ObjectMapper();
//    mapper.writeValue(response.getOutputStream(), result);
//
//  }
//}
