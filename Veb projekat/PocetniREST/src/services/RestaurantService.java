package services;

import java.util.ArrayList;
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

import beans.Item;
import beans.Restaurant;
import beans.User;
import dao.ItemsDAO;
import dao.RestaurantsDAO;
import dto.ItemDTO;
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
	
	@GET
	@Path("getMyRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyRestaurant() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		RestaurantsDAO restaurants = getRestaurants();
		Restaurant restaurant =  restaurants.getRestaurantByManager(user.getUserName());
		request.getSession().setAttribute("activeRestaurant", restaurant);
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(restaurant)
				.build();
	}
	
	@POST
	@Path("addItem")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addItem(ItemDTO dto) {
		Restaurant activeRestaurant = (Restaurant) request.getSession().getAttribute("activeRestaurant");
		int itemID = getItems().addItem(dto, activeRestaurant.getName());
		activeRestaurant.addItemID(itemID);
		getRestaurants().updateRestaurant(activeRestaurant);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	@GET
	@Path("getItems")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getItemsForRestaurant() {
		Restaurant activeRestaurant = (Restaurant) request.getSession().getAttribute("activeRestaurant");
		Collection<Item> items = getItems().getItemsForRestaurant(activeRestaurant.getName());
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").entity(items).build();
	}
	
	private RestaurantsDAO getRestaurants() {
		RestaurantsDAO restaurants = (RestaurantsDAO) ctx.getAttribute("restaurants");
		
		if (restaurants == null) {
			restaurants = new RestaurantsDAO();
			ctx.setAttribute("restaurants", restaurants);

		}

		return restaurants;
	}
	
	private ItemsDAO getItems() {
		ItemsDAO items = (ItemsDAO) ctx.getAttribute("items");
		
		if (items == null) {
			items = new ItemsDAO();
			ctx.setAttribute("items", items);

		}

		return items;
	}
}
