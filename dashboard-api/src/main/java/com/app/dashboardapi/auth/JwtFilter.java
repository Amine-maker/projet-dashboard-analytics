// package com.app.dashboardapi.auth;

// import java.util.Arrays;

// import org.springframework.beans.factory.annotation.Autowired;
// import
// org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import
// org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.web.filter.OncePerRequestFilter;

// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.io.IOException;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// public class JwtFilter extends OncePerRequestFilter {

// @Autowired
// private UserDetailsService userDetailsService;

// @Autowired
// private JwtTokenUtil jwtTokenUtil;

// @Override
// protected void doFilterInternal(HttpServletRequest req, HttpServletResponse
// res, FilterChain chain)
// throws IOException, ServletException {

// String header = req.getHeader("Authorization");
// String username = null;
// String authToken = null;

// if (header != null && header.startsWith("Bearer ")) {

// authToken = header.replace("Bearer ", "");

// try {

// username = jwtTokenUtil.getUsernameFromToken(authToken);

// } catch (IllegalArgumentException e) {

// logger.error("an error occured during getting username from token", e);

// } catch (ExpiredJwtException e) {

// logger.warn("the token is expired and not valid anymore", e);
// }
// } else {
// logger.warn("couldn't find bearer string, will ignore the header");
// }

// if (username != null &&
// SecurityContextHolder.getContext().getAuthentication() == null) {

// UserDetails userDetails = userDetailsService.loadUserByUsername(username);

// if (jwtTokenUtil.validateToken(authToken)) {

// String role = "";

// role = userDetails.getAuthorities().size() > 1 ? "ADMIN" : "USER";

// UsernamePasswordAuthenticationToken authentication = new
// UsernamePasswordAuthenticationToken(
// userDetails, null, Arrays.asList(new SimpleGrantedAuthority(role)));

// authentication.setDetails(new
// WebAuthenticationDetailsSource().buildDetails(req));

// logger.info("authenticated user " + username + ", setting security context");

// SecurityContextHolder.getContext().setAuthentication(authentication);
// }
// }

// chain.doFilter(req, res);
// }
// }
