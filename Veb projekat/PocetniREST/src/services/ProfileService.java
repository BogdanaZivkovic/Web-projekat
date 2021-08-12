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
import dto.UserDTO;

@Path("/profile")
public class ProfileService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getUser")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getLoggedUser() {
		User user = (User) request.getSession().getAttribute("loggedUser");
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
				.entity( user)
				.build();
	}
	
	@POST
	@Path("/update")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateUser(UserDTO dto) {
		UsersDAO users = getUsers();
		users.updateUser(dto);
		User user = users.getUser(dto.userName);
		request.getSession().setAttribute("loggedUser", user);
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS")
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
}
