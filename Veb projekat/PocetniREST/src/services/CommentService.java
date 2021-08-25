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

import dao.CommentsDAO;
import dto.CommentDTO;

@Path("/comments")
public class CommentService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@GET
	@Path("/getComments")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJustComments() {
		
					return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS GET")
					.entity(getComments().getValues())
					.build();
		
	}
	
	@POST
	@Path("/addComment")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addComment(CommentDTO dto)
	{
		CommentsDAO comments = getComments();
		
		comments.addComment(dto);

		return Response.status(Response.Status.ACCEPTED).entity("/PocetniREST/").build();
	}
	
	private CommentsDAO getComments() {

		CommentsDAO commentsDAO = (CommentsDAO) ctx.getAttribute("comments");

		if (commentsDAO == null) {
			commentsDAO = new CommentsDAO();
			commentsDAO.readComments();
			ctx.setAttribute("comments", commentsDAO);
		}

		return commentsDAO;
	}
}
