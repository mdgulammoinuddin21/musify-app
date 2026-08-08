package com.spotify.musify.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.spotify.musify.document.Album;
import com.spotify.musify.dto.AlbumListResponse;
import com.spotify.musify.dto.AlbumRequest;
import com.spotify.musify.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumService {
	
	private final AlbumRepository albumRepository;
	private final Cloudinary cloudinary;
	
	public Album addAlbum(AlbumRequest request) throws IOException {

	    Map<String, Object> imageUploadResult =
	            cloudinary.uploader().upload(request.getImageFile().getBytes(), ObjectUtils.asMap("resource_type", "image"));

	    Album newAlbum = Album.builder()
	            .name(request.getName())
	            .desc(request.getDesc())
	            .bgColor(request.getBgColor())
	            .imageUrl(imageUploadResult.get("secure_url").toString())
	            .build();

	    return albumRepository.save(newAlbum);
	}
	
	public AlbumListResponse getAllAlbums() {
	    return new AlbumListResponse(
	            true,
	            albumRepository.findAll()
	    );
	}

	public Boolean removeAlbum(String id) {
	    Album existingAlbum = albumRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Album not found"));

	    albumRepository.delete(existingAlbum);

	    return true;
	}
}
