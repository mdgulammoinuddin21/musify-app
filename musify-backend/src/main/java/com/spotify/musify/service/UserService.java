package com.spotify.musify.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spotify.musify.document.User;
import com.spotify.musify.dto.RegisterRequest;
import com.spotify.musify.dto.UserResponse;
import com.spotify.musify.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public UserResponse registerUser(RegisterRequest request) {

	    // Check if email already exists
	    if (userRepository.existsByEmail(request.getEmail())) {
	        throw new RuntimeException("Email already exists");
	    }

	    // Create new user
	    User newUser = User.builder()
	            .email(request.getEmail())
	            .password(passwordEncoder.encode(request.getPassword()))
	            .role(User.Role.USER)
	            .build();

	    userRepository.save(newUser);

	    return UserResponse.builder()
	    		.id(newUser.getId())
	            .email(newUser.getEmail())
	            .role(UserResponse.Role.USER)
	            .build();
	}
	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found for the email"+email));
	}
}
