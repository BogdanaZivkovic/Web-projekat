package beans;

public class Comment {
	private String customerUsername;
	private String restaurantName;
	private String commentText;
	private double rating;
	
	
	public Comment() {
		
	}

	public Comment(String customerUsername, String restaurantName, String commentText, double rating) {
		super();
		this.customerUsername = customerUsername;
		this.restaurantName = restaurantName;
		this.commentText = commentText;
		this.rating = rating;
	}


	public String getCustomerUsername() {
		return customerUsername;
	}


	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}


	public String getRestaurantName() {
		return restaurantName;
	}


	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}


	public String getCommentText() {
		return commentText;
	}


	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}


	public double getRating() {
		return rating;
	}


	public void setRating(double rating) {
		this.rating = rating;
	}
	
	
}
