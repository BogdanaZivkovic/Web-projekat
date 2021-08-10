package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Image;

public class ImagesDAO {
	
	private HashMap<Integer, Image> images = new HashMap<Integer, Image>();
	private String path = System.getProperty("catalina.base") + File.separator + "data" + File.separator + "images.json";

	
	public ImagesDAO() {
		readImages();
	}
	
	private void readImages() {
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(this.path);

		List<Image> loadedImages = new ArrayList<Image>();
		try {

			loadedImages = objectMapper.readValue(file, new TypeReference<List<Image>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Image image : loadedImages) {
			images.put(image.getID(), image);
		}
	}
	
	public void saveImages() {
		List<Image> allImages = new ArrayList<Image>();
		for (Image image : getValues()) {
			allImages.add(image);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(this.path), allImages);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Collection<Image> getValues() {
		return images.values();
	}

	public Image addNewImage(String base64) {
		
		Integer ID = getValues().size() + 1;
		Image newImage = new Image(ID, base64);
		images.put(newImage.getID(), newImage);
		saveImages();
		return newImage;
	}	
}
