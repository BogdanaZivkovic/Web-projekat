package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Image;
import dao.ImagesDAO;

@Path("/images")
public class ImageService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getImages")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Image> getAllImages(){
		System.out.println("\n\n\t\t\t ucitavanje slika \n\n");
		return getImages().getValues();
	}
	
	
	
	private ImagesDAO getImages() {
		ImagesDAO images = (ImagesDAO) ctx.getAttribute("images");
		
		if(images == null) {
			images = new ImagesDAO();
			images.readImages();
			
			ctx.setAttribute("images", images);
		}
		
		System.out.println("\n\n\t\t\t cita slike \n\n");
		return images;
		
	}
}
