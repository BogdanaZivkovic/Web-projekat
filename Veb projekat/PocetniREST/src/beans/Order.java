package beans;

import java.util.ArrayList;
import java.util.Date;

public class Order {
	
	private String orderID; 
	private String restaurantName;
	private String userName;
	//PROCESSING, IN_PREPARATION, WAITING_FOR_DELIVERY, IN_TRANSPORT, DELIVERED, CANCELED
	private String status;
	private Date dateAndTime;
	private double price;
	private Boolean isDeleted;
	private String deliverer;
	private Boolean commented;
	
	private ArrayList<ShoppingCartItem> items;
	
	private ArrayList<String> requests;
	
	public Order() {}
	
	public Order(String orderID, String restaurantName, String userName, String status, Date dateAndTime,
			double price, ArrayList<ShoppingCartItem> items) {
		super();
		this.orderID = orderID;
		this.restaurantName = restaurantName;
		this.userName = userName;
		this.status = status;
		this.dateAndTime = dateAndTime;
		this.price = price;
		this.items = new ArrayList<ShoppingCartItem>(items);
		requests = new ArrayList<String>();
		isDeleted = false;
		deliverer = "";
		commented = false;
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
	
	public Boolean getCommented() {
		return commented;
	}

	public void setCommented(Boolean commented) {
		this.commented = commented;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public Date getDateAndTime() {
		return dateAndTime;
	}

	public void setDateAndTime(Date dateAndTime) {
		this.dateAndTime = dateAndTime;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ArrayList<ShoppingCartItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<ShoppingCartItem> items) {
		this.items = items;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	public void addItem(ShoppingCartItem item) {
		items.add(item);
	}

	public ArrayList<String> getRequests() {
		return requests;
	}

	public void setRequests(ArrayList<String> requests) {
		this.requests = requests;
	}
	
	public void addRequest(String userName) {
		requests.add(userName);
	}

	public String getDeliverer() {
		return deliverer;
	}

	public void setDeliverer(String deliverer) {
		this.deliverer = deliverer;
	}
}
