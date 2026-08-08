package com.spotify.musify.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.spotify.musify.document.Song;

public interface SongRepository extends MongoRepository<Song, String>{

}
