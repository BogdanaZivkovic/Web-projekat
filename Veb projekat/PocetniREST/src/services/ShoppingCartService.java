package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Item;
import beans.ShoppingCart;
import beans.ShoppingCartItem;
import beans.User;
import dao.UsersDAO;
import dto.ItemIDDTO;
import dto.RestaurantNameDTO;

@Path("/shoppingCart")
public class ShoppingCartService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addItem(ShoppingCartItem item) {
		getShoppingCart().addItem(item);
		for(ShoppingCartItem i: getShoppingCart().getItems()) {
			System.out.println(i.getItem().getName());
			System.out.println(i.getCount());
		}
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}

	@GET
	@Path("/getJustSc")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJustSc() {
		Collection<ShoppingCartItem> items =  getShoppingCart().getItems();
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(items)
				.build();
	}

	@POST
	@Path("/initSc")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response clearSc(RestaurantNameDTO dto) {
		ShoppingCart sc = getShoppingCart();
		if (!sc.getRestaurantName().equals(dto.name)) {
			sc.getItems().clear();
			sc.setTotalPrice(0);
			sc.setRestaurantName(dto.name);
		}
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	@POST
	@Path("/editQuantity")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editQuantity(ShoppingCartItem shoppingCartItem) {
		ShoppingCart sc = getShoppingCart();
		sc.changeQuantity(shoppingCartItem);
	
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	@POST
	@Path("/removeItem")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response removeItem(ItemIDDTO dto) {
		getShoppingCart().removeItem(dto.itemID);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}


	@GET
	@Path("/getScTotal")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getScTotal() {
		
		double totalPrice =  getShoppingCart().getTotalPrice();

		for(User user : getUsers().getValues()) {
			if(user.getUserName().matches(getShoppingCart().getCustomerUsername())) {
				
				if(user.getCustomerType().matches("GOLD")) {
					totalPrice = totalPrice*0.85;
				}
				
				else if(user.getCustomerType().matches("SILVER")) {
					totalPrice = totalPrice*0.90;
				}
				
				else if(user.getCustomerType().matches("BRONZE")) {
					totalPrice = totalPrice*0.95;
				}	
			}
		}
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(totalPrice)
				.build();
	}
	
	@GET
	@Path("/getDiscount")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDiscount() {
		String ret = "0%";
		for(User user : getUsers().getValues()) {
			if(user.getUserName().matches(getShoppingCart().getCustomerUsername())) {
				
				if(user.getCustomerType().matches("GOLD")) {
					ret = "15%";
				}
				
				else if(user.getCustomerType().matches("SILVER")) {
					ret = "10%";
				}
				
				else if(user.getCustomerType().matches("BRONZE")) {
					ret = "5%";
				}	
			}
		}
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(ret)
				.build();
	}

	private ShoppingCart getShoppingCart() {
		ShoppingCart sc = (ShoppingCart) request.getSession().getAttribute("shoppingCart");
		if (sc == null) {
			User user = (User) request.getSession().getAttribute("loggedUser");
			sc = new ShoppingCart(user.getUserName());
			request.getSession().setAttribute("shoppingCart", sc);
		}
		return sc;
	}
	
	private UsersDAO getUsers() {
		UsersDAO users = (UsersDAO) ctx.getAttribute("users");
		
		if (users == null) {
			users = new UsersDAO();
			ctx.setAttribute("users", users);

		}

		return users;
	}
}
