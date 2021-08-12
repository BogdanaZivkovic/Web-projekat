package services;

import java.util.ArrayList;
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

import beans.User;
import beans.Restaurant;
import dao.RestaurantsDAO;
import dao.UsersDAO;
import dto.LoginDTO;
import dto.UserDTO;
import dto.UserNameDTO;

@Path("/users")
public class UserService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@POST
	@Path("/registration")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registerUser(UserDTO dto)
	{
		UsersDAO users = getUsers();
		
		if(users.getUserByUsername(dto.userName) != null)
		{
			System.out.println("korisnik vec postoji");
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("Username taken. Please try another one").build();
		}
		users.addUser(dto);
		System.out.println(dto.userName);
		return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/").build();
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response loginUser(LoginDTO dto) {
		User user = getUsers().getUserByUsername(dto.userName);	
		if(user == null || !user.getPassword().equals(dto.password))
		{
			System.out.println("bad");
			return Response.status(Response.Status.BAD_REQUEST).entity("Password or username are incorrect, try again")
					.build();
		}
		
		request.getSession().setAttribute("loggedUser", user);
		
		System.out.println("good");
		if (user.getRole().equals("CUSTOMER"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/customerView.html").build();
		else if (user.getRole().equals("MANAGER"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/managerView.html").build();
		else if (user.getRole().equals("ADMINISTRATOR"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/administratorView.html").build();
		else if (user.getRole().equals("DELIVERER"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/delivererView.html").build();
		else
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/").build();
	}
	
	@GET
	@Path("/getAllUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllUsers() {
		Collection<User> users = getUsers().getActiveUsers();
		User user = (User) request.getSession().getAttribute("loggedUser");
		for(User u: users) 
			if (u.getUserName().equals(user.getUserName()))
				users.remove(u);
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(users)
				.build();
	}
	
	@GET
	@Path("/getAvailableManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getManagers() {
		Collection<User> users = getUsers().getActiveUsers();
		Collection<Restaurant> restaurants = getRestaurants().getValues();
		ArrayList<User> managers = new ArrayList<User>();
		ArrayList<User> filteredManagers = new ArrayList<User>();
		
		for (User user : users) {
			if(user.getRole().equals("MANAGER")) {
				managers.add(user);
			}
		}
		
		int count = 0; 
		
		for (User manager : managers) {
			for (Restaurant restaurant : restaurants) {
				if(restaurant.getManagerUsername().compareTo(manager.getUserName())==0) {
					count = 1;
				}
			}
			
			if(count==0) {
				filteredManagers.add(manager);
			}
			else {
				count = 0;
			}
		}
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity(filteredManagers)
				.build();			
	}
	
	private UsersDAO getUsers() {
		UsersDAO users = (UsersDAO) ctx.getAttribute("users");
		
		if (users == null) {
			users = new UsersDAO();
			ctx.setAttribute("users", users);

		}

		return users;
	}
	
	private RestaurantsDAO getRestaurants() {
		RestaurantsDAO restaurants = (RestaurantsDAO) ctx.getAttribute("restaurants");
		
		if (restaurants == null) {
			restaurants = new RestaurantsDAO();
			ctx.setAttribute("restaurants", restaurants);

		}

		return restaurants;
	}
	
	@GET
	@Path("/logout")
	@Produces(MediaType.TEXT_HTML)
	public Response logoutUser() {
		
		if(isUserManager() || isUserAdmin() || isUserCustomer() || isUserDeliverer()) {
		
			HttpSession session = request.getSession();
			if(session != null && session.getAttribute("loggedUser") != null) {
				session.invalidate();
			}
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS LOGOUT")
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	@POST
	@Path("/delete")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteUser(UserNameDTO dto) {
		getUsers().deleteLogically(dto.userName);
		return Response.status(Response.Status.ACCEPTED).entity("SUCCESS").build();
	}
	
	private boolean isUserManager() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		
		if(user!= null) {
			if(user.getRole().equals("MANAGER")) {	
				return true;
			}
		}	
		return false;
	}
	
	private boolean isUserAdmin() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		
		if(user!= null) {
			if(user.getRole().equals("ADMINISTRATOR")) {
				return true;
			}
		}	
		return false;
	}
	
	private boolean isUserCustomer() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		
		if(user!= null) {
			if(user.getRole().equals("CUSTOMER")) {
				return true;
			}
		}	
		return false;
	}
	
	private boolean isUserDeliverer() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		
		if(user!= null) {
			if(user.getRole().equals("DELIVERER")) {
				return true;
			}
		}	
		return false;
	}
}
