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
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String registerUser(User user)
	{
		getUsers().addUser(user);
		System.out.println(user.getUserName());
		return "OK";
	}
	
	@GET
	@Path("/getNewUser")
	@Produces(MediaType.APPLICATION_JSON)
	public User getNewUser() {
		User user = new User();	
		return user;

	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String loginUser(LoginDTO dto) {
		User user = getUsers().getUserByUsername(dto.userName);	
		if(user == null || !user.getPassword().equals(dto.password))
		{
			System.out.println("bad");
			return "NOT OK";
		}
		System.out.println("good");
		return "OK";
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
