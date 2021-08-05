package services;

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

import beans.User;
import dao.UsersDAO;
import dto.LoginDTO;

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
	public Response registerUser(User user)
	{
		UsersDAO users = getUsers();
		
		if(users.getUserByUsername(user.getUserName()) != null)
		{
			System.out.println("korisnik vec postoji");
			return Response.status(Response.Status.BAD_REQUEST)
					.entity("Username taken. Please try another one").build();
		}
		
		users.addUser(user);
		System.out.println(user.getUserName());
		//return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/#/login").build();
		return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/#/login").build();
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response loginUser(LoginDTO dto) {
		User user = getUsers().getUserByUsername(dto.userName);	
		if(user == null || !user.getPassword().equals(dto.password))
		{
			System.out.println("bad-o");
			return Response.status(Response.Status.BAD_REQUEST).entity("Password or username are incorrect, try again")
					.build();
		}
		System.out.println("good-o");
		if (user.getRole().equals("CUSTOMER"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/customerView.html").build();
		else if (user.getRole().equals("MANAGER"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/managerView.html").build();
		else if (user.getRole().equals("ADMINISTRATOR"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/administratorView.html").build();
		else if (user.getRole().equals("DELIVERER"))
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/delivererView.html").build();
		else
			return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/#/login").build();
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
