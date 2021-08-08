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

import beans.Restaurant;
import dao.RestaurantsDAO;
import dto.RestaurantDTO;

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
		
		if(restaurants.getRestaurantByName(dto.name) != null)
		{
			System.out.println("restoran sa istim nazivom vec postoji");
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("Username taken. Please try another one").build();
		}
		
		restaurants.addRestaurant(dto);
		System.out.println(dto.name);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	@GET
	@Path("/getAllRestaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllRestaurants() {
		Collection<Restaurant> restaurants = getRestaurants().getValues();
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(restaurants)
				.build();
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
