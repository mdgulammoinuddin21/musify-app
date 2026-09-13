package com.spotify.musify.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spotify.musify.document.User;
import com.spotify.musify.dto.AuthRequest;
import com.spotify.musify.dto.AuthResponse;
import com.spotify.musify.dto.RegisterRequest;
import com.spotify.musify.dto.UserResponse;
import com.spotify.musify.service.AppUserDetailsService;
import com.spotify.musify.service.UserService;
import com.spotify.musify.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final AppUserDetailsService userDetailsService;
	private final JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest request) {

	    try {
	    	
	    	User existingUser = userService.findByEmail(request.getEmail());
	    	if(request.getPortal().equalsIgnoreCase("admin") && 
	    			existingUser.getRole().name().equalsIgnoreCase("user")) {
	    		
	    		return ResponseEntity.badRequest().body("Email/Password is incorrect");
	    	}

	        authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        request.getEmail(),
	                        request.getPassword()
	                )
	        );
	        
	        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
	        
	        String token = jwtUtil.generateToken(userDetails, existingUser.getRole().name());
	        
	        

	        AuthResponse response = new AuthResponse(
	                token,
	                request.getEmail(),
	                existingUser.getRole().name()
	        );

	        return ResponseEntity.ok(response);

	    } catch (BadCredentialsException e) {

	        return ResponseEntity
	                .badRequest()
	                .body("Email/Password is incorrect");

	    } catch (Exception e) {

	        return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(e.getMessage());
	    }
	}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        try {
            UserResponse response = userService.registerUser(request);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    
    @PostMapping("/promote-admin")
    public ResponseEntity<?> promoteToAdmin(@RequestBody Map<String, String> request) {
        try {
            User user = userService.promoteToAdmin(request.get("email"));

            return ResponseEntity.ok(
                new AuthResponse(null, user.getEmail(), "ADMIN")
            );

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Failed to promote user to admin");
        }
    }
}