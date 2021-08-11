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

import beans.Item;
import dao.ItemsDAO;
import dao.RestaurantsDAO;
import dto.ItemDTO;

@Path("/items")
public class ItemService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("getAllItems")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllItems() {
		Collection<Item> items = getItems().getValues();
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(items)
				.build();
	}
	
	@POST
	@Path("addItem")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addItem(ItemDTO dto) {
		int itemID = getItems().addItem(dto);
		getRestaurants().addItem(dto.restaurantName, itemID);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	private ItemsDAO getItems() {
		ItemsDAO items = (ItemsDAO) ctx.getAttribute("items");
		
		if (items == null) {
			items = new ItemsDAO();
			ctx.setAttribute("items", items);

		}

		return items;
	}
	
	@POST
	@Path("editItem")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editItem(Item item) {
		getItems().editItem(item);
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
}
