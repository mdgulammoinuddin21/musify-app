package com.spotify.musify.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.spotify.musify.document.Album;

public interface AlbumRepository extends MongoRepository<Album, String>{

}
