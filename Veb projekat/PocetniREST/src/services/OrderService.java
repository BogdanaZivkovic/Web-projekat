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

import beans.Order;
import beans.Restaurant;
import beans.ShoppingCart;
import beans.User;
import dao.CustomerTypeDAO;
import dao.OrdersDAO;
import dao.RestaurantsDAO;
import dao.UsersDAO;
import dto.ApproveOrderDTO;
import dto.OrderIDDTO;
import dto.OrderStatusDTO;

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
		
		CustomerTypeDAO customerTypes = new CustomerTypeDAO();

		User user = getUsers().getActiveUser(sc.getCustomerUsername());
		double userPoints = user.getPoints();
		double totalPrice = sc.getTotalPrice();
		
		if(user.getCustomerType().matches("GOLD")) {
			sc.setTotalPrice(totalPrice*0.85);
		}
		
		else if(user.getCustomerType().matches("SILVER")) {
			sc.setTotalPrice(totalPrice*0.9);
		}
		
		else if(user.getCustomerType().matches("BRONZE")) {
			sc.setTotalPrice(totalPrice*0.95);
		}
		
		double points = sc.getTotalPrice()/1000*133;
		
		user.setPoints(userPoints + points);
		
		if (user.getPoints() >= customerTypes.getCustomerType("GOLD").getPoints()) {
			user.setCustomerType("GOLD");
		}
		else if (user.getPoints() >= customerTypes.getCustomerType("SILVER").getPoints()) {
			user.setCustomerType("SILVER");
		}
		else if (user.getPoints() >= customerTypes.getCustomerType("BRONZE").getPoints()) {
			user.setCustomerType("BRONZE");
		}
		
		getUsers().saveUsers();

		getOrders().createOrder(sc);
		sc.getItems().clear();
		sc.setTotalPrice(0.0);

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

	@GET
	@Path("/getOrdersRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrdersForRestaurant() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		RestaurantsDAO restaurants = getRestaurants();
		Restaurant restaurant =  restaurants.getRestaurantByManager(user.getUserName());
		Collection<Order> orders = getOrders().getOrdersForRestaurant(restaurant.getName());
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(orders)
				.build();
	}

	@GET
	@Path("/getWaiting")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getWaiting() {
		Collection<Order> orders = getOrders().getWaiting();
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(orders)
				.build();
	}

	@POST
	@Path("/changeStatus")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response changeStatus(OrderStatusDTO dto) {
		getOrders().changeStatus(dto);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	@POST
	@Path("/changeCommented")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response changeCommented(OrderIDDTO dto) {
		getOrders().getOrder(dto.orderID).setCommented(true);
		getOrders().saveOrders();
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}

	@POST
	@Path("/requestDelivery")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response requestDelivery(OrderIDDTO dto) {
		User user = (User) request.getSession().getAttribute("loggedUser");
		getOrders().getOrder(dto.orderID).addRequest(user.getUserName());;
		getOrders().saveOrders();
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}

	@POST
	@Path("/approveDelivery")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response approveDelivery(ApproveOrderDTO dto) {
		Order order = getOrders().getOrder(dto.orderID);
		order.setStatus("IN_TRANSPORT");
		order.setDeliverer(dto.userName);
		getOrders().saveOrders();
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}

	@GET
	@Path("/getOrdersDeliverer")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrdersDeliverer() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		Collection<Order> orders = getOrders().getOrdersForDeliverer(user.getUserName());
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(orders)
				.build();
	}

	@POST
	@Path("/removePoints")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response removePoints(OrderStatusDTO dto) {
		
		CustomerTypeDAO customerTypes = new CustomerTypeDAO();
		Order order = getOrders().getOrder(dto.orderID);

		double points = order.getPrice()/1000*133*4;
		User user = getUsers().getActiveUser(order.getUserName());

		double userPoints = user.getPoints();
		user.setPoints(userPoints - points);
		
		if (user.getPoints() >= customerTypes.getCustomerType("GOLD").getPoints()) {
			user.setCustomerType("GOLD");
		}
		else if (user.getPoints() >= customerTypes.getCustomerType("SILVER").getPoints()) {
			user.setCustomerType("SILVER");
		}
		else if (user.getPoints() >= customerTypes.getCustomerType("BRONZE").getPoints()) {
			user.setCustomerType("BRONZE");
		}
		else {
			user.setCustomerType("");
		}
		
		getUsers().saveUsers();

		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	@GET
	@Path("/getSussyUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSussyUsers() {
		Collection<User> allUsers = getUsers().getActiveUsers();
		Collection<User> sussyUsers = new ArrayList<User>();
		for(User user : allUsers) {
			if(getOrders().isUserSussy(user.getUserName())) {
				sussyUsers.add(user);
			}
		}
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(sussyUsers)
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

	private RestaurantsDAO getRestaurants() {
		RestaurantsDAO restaurants = (RestaurantsDAO) ctx.getAttribute("restaurants");

		if (restaurants == null) {
			restaurants = new RestaurantsDAO();
			ctx.setAttribute("restaurants", restaurants);

		}

		return restaurants;
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
