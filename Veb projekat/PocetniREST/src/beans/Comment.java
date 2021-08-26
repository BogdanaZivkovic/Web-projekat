package beans;

public class Comment {
	
	private int commentID;
	private Boolean isDeleted;	
	private String customerUsername;
	private String restaurantName;
	private String commentText;
	private double rating;
	//PENDING, ACCEPTED, REJECTED
	private String status;
	
	public Comment() {
		
	}

	public Comment(int commentID, String customerUsername, String restaurantName, String commentText, double rating) {
		super();
		this.commentID = commentID;
		this.customerUsername = customerUsername;
		this.restaurantName = restaurantName;
		this.commentText = commentText;
		this.rating = rating;
		isDeleted = false;
		status = "PENDING";
	}

	public int getCommentID() {
		return commentID;
	}

	public void setCommentID(int commentID) {
		this.commentID = commentID;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
