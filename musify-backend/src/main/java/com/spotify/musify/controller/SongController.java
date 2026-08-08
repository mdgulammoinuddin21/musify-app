package com.spotify.musify.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spotify.musify.dto.SongListResponse;
import com.spotify.musify.dto.SongRequest;
import com.spotify.musify.service.SongService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;
    
    @PostMapping
    public ResponseEntity<?> addSong(
            @RequestPart("request") String requestString,
            @RequestPart("audio") MultipartFile audioFile,
            @RequestPart("image") MultipartFile imageFile) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            SongRequest songRequest =
                    objectMapper.readValue(requestString, SongRequest.class);

            songRequest.setImageFile(imageFile);
            songRequest.setAudioFile(audioFile);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(songService.addSong(songRequest));

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<?> listSongs() {
        try {
            return ResponseEntity.ok(songService.getAllSongs());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    new SongListResponse(false, null)
            );
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeSong(@PathVariable String id) {
        try {
            Boolean removed = songService.removeSong(id);

            if (removed) {
                return ResponseEntity
                        .noContent()
                        .build();
            } else {
                return ResponseEntity
                        .badRequest()
                        .build();
            }

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}