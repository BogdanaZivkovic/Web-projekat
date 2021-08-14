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

import beans.ShoppingCart;
import beans.ShoppingCartItem;
import beans.User;

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
	
	@GET
	@Path("/getScTotal")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getScTotal() {
		double totalPrice =  getShoppingCart().getTotalPrice();
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(totalPrice)
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
}
