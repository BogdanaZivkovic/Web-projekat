package services;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Comment;
import beans.Restaurant;
import dao.CommentsDAO;
import dao.RestaurantsDAO;
import dto.CommentDTO;

@Path("/comments")
public class CommentService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@GET
	@Path("/getComments")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJustComments() {
		
					return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS GET")
					.entity(getComments().getValues())
					.build();
		
	}
	
	@POST
	@Path("/addComment")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addComment(CommentDTO dto)
	{
		CommentsDAO comments = getComments();
		
		comments.addComment(dto);
		
		RestaurantsDAO restaurants = getRestaurants();
		Restaurant restaurant = restaurants.getRestaurant(dto.restaurantName);
		
		Double sum = 0.0;
		Double count = 0.0;
		
		for (Comment comment : comments.getValues()) {
			if(comment.getRestaurantName().matches(restaurant.getName())) {
				sum += comment.getRating();
				count += 1.0;
			}
		}
		
		restaurant.setAverageRating(sum/count);
	
		restaurants.saveRestaurants();

		return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/").build();
	}
	
	private CommentsDAO getComments() {

		CommentsDAO commentsDAO = (CommentsDAO) ctx.getAttribute("comments");

		if (commentsDAO == null) {
			commentsDAO = new CommentsDAO();
			commentsDAO.readComments();
			ctx.setAttribute("comments", commentsDAO);
		}

		return commentsDAO;
	}
	
	private RestaurantsDAO getRestaurants() {
		RestaurantsDAO restaurants = (RestaurantsDAO) ctx.getAttribute("restaurants");

		if (restaurants == null) {
			restaurants = new RestaurantsDAO();
			ctx.setAttribute("restaurants", restaurants);

		}

		return restaurants;
	}
}
