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

import beans.Order;
import beans.ShoppingCart;
import beans.User;
import dao.OrdersDAO;

@Path("/orders")
public class OrderService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@POST
	@Path("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response CreateOrders() {
		ShoppingCart sc = getShoppingCart();
		getOrders().createOrder(sc);
		sc.getItems().clear();
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	private OrdersDAO getOrders() {
		OrdersDAO orders = (OrdersDAO) ctx.getAttribute("orders");
		
		if (orders == null) {
			orders = new OrdersDAO();
			ctx.setAttribute("orders", orders);

		}

		return orders;
	}
	
	@GET
	@Path("/getMyOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyOrders() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		Collection<Order> orders = getOrders().getOrdersForUser(user.getUserName());
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(orders)
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
