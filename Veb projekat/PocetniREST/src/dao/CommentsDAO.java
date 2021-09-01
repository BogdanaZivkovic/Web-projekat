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

import beans.Comment;
import dto.CommentDTO;

public class CommentsDAO {

	private HashMap<Integer, Comment> comments = new HashMap<Integer, Comment>();
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
			comments.put(comment.getCommentID(), comment);
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
	
	public Collection<Comment> getValues() {
		return comments.values();
	}

	public Comment getComment(int id) {
		return comments.get(id);
	}
	
	public Collection<Comment> getActiveComments() {
		Collection<Comment> ret = new ArrayList<Comment>();
		for(Comment comment : getValues())
			if(!comment.getIsDeleted())
				ret.add(comment);
		return ret;
	}

	public Comment getActiveComment(int id) {
		Comment comment = getComment(id);
		if(comment == null || comment.getIsDeleted())
			return null;
		return comment;
	}

	public void addComment(CommentDTO dto) {
		Comment comment = new Comment(comments.size()+1, dto.customerUsername, dto.restaurantName, dto.commentText, dto.rating);
		comments.put(comment.getCommentID(),comment);
		saveComments();
	}
	
	public Collection<Comment> getAccepted() {
		Collection<Comment> ret = new ArrayList<Comment>();
		for(Comment comment : getActiveComments()) {
			if(comment.getStatus().equals("ACCEPTED")) {
				ret.add(comment);
			}
		}
		return ret;
	}
	
	public void deleteComment(int commentID) {
		getComment(commentID).setIsDeleted(true);
		saveComments();
	}
}
