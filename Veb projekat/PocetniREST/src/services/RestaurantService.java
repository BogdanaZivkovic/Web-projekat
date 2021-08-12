package services;

import java.util.Collection;

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

import beans.Image;
import beans.Item;
import beans.Restaurant;
import beans.User;
import dao.ImagesDAO;
import dao.ItemsDAO;
import dao.RestaurantsDAO;
import dto.RestaurantDTO;
import dto.RestaurantNameDTO;

@Path("/restaurants")
public class RestaurantService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;


	@POST
	@Path("/create")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createRestaurant(RestaurantDTO dto)
	{
		RestaurantsDAO restaurants = getRestaurants();

		if(restaurants.getRestaurant(dto.name) != null)
		{
			System.out.println("restoran sa istim nazivom vec postoji");
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("Username taken. Please try another one").build();
		}

		ImagesDAO imagesDAO = getImages();
		Image addedImage = imagesDAO.addNewImage(dto.logoPath);
		dto.logoPath = Integer.toString(addedImage.getID());

		restaurants.addRestaurant(dto);
		System.out.println(dto.name);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}

	@GET
	@Path("/getAllRestaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllRestaurants() {
		Collection<Restaurant> restaurants = getRestaurants().getActiveRestaurants();
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(restaurants)
				.build();
	}

	@GET
	@Path("/getMyRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyRestaurant() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		RestaurantsDAO restaurants = getRestaurants();
		Restaurant restaurant =  restaurants.getRestaurantByManager(user.getUserName());
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(restaurant)
				.build();
	}

	@POST
	@Path("/delete")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteRestaurant(RestaurantNameDTO dto) {
		getRestaurants().deleteLogically(dto.name);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}

	private RestaurantsDAO getRestaurants() {
		RestaurantsDAO restaurants = (RestaurantsDAO) ctx.getAttribute("restaurants");

		if (restaurants == null) {
			restaurants = new RestaurantsDAO();
			ctx.setAttribute("restaurants", restaurants);

		}

		return restaurants;
	}
	
	private ImagesDAO getImages() {
		ImagesDAO images = (ImagesDAO) ctx.getAttribute("images");

		if(images == null) {
			images = new ImagesDAO();
			images.readImages();

			ctx.setAttribute("images", images);
		}

		return images;

	}
}
