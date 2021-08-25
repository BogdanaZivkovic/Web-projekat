package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import dto.CommentDTO;

public class CommentsDAO {

	private ArrayList<Comment> comments = new ArrayList<Comment>();
	private String path = System.getProperty("catalina.base") + File.separator + "data" + File.separator + "comments.json";

	public CommentsDAO() {
		readComments();
	}
	
	public void readComments() {
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(this.path);

		List<Comment> loadedComments = new ArrayList<Comment>();
		try {

			loadedComments = objectMapper.readValue(file, new TypeReference<List<Comment>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Comment comment : loadedComments) {
			comments.add(comment);
		}
	}
	
	public void saveComments() {
		List<Comment> allComments = new ArrayList<Comment>();
		for (Comment comment : getValues()) {
			allComments.add(comment);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(this.path), allComments);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<Comment> getValues() {
		return comments;
	}

	public Comment getCommentById(int id) {
		for (Comment comment : comments) {
			if (comment.getCommentID()==id) {
				return comment;
			}
		}
		return null;
	}


	public void addComment(CommentDTO dto) {
	
		Comment comment = new Comment(comments.size()+1, dto.customerUsername, dto.restaurantName, dto.commentText, dto.rating);
		comments.add(comment);
		saveComments();
	}
}