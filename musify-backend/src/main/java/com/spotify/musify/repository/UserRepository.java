package com.spotify.musify.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.spotify.musify.document.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	Optional<User> findByEmail(String email);
	
	Boolean existsByEmail(String email);
}
