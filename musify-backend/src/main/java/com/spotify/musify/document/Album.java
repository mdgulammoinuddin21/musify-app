package com.spotify.musify.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "albums")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Album {
	
	@Id
	@JsonProperty("_id")
	private String id;
	private String name;
	private String desc;
	private String bgColor;
	private String imageUrl;
	
}
