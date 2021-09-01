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
import dao.ImagesDAO;
import dao.ItemsDAO;
import dao.RestaurantsDAO;
import dto.ItemDTO;
import dto.ItemIDDTO;
import dto.ItemToEditDTO;

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
		Collection<Item> items = getItems().getActiveItems();
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
		if(!getItems().isItemUnique(dto)) {
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("Your restaurant already has that item").build();
		}

		ImagesDAO imagesDAO = getImages();
		Image addedImage = imagesDAO.addNewImage(dto.logoPath);
		dto.logoPath = Integer.toString(addedImage.getID());

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
	public Response editItem(ItemToEditDTO dto) {
		if(!getItems().isEditedItemUnique(dto)) {
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("Your restaurant already has that item").build();
		}
		getItems().editItem(dto);
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

	@POST
	@Path("delete")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteItem(ItemIDDTO dto) {
		getItems().deleteLogically(dto.itemID);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
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
