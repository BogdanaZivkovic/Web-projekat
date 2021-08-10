package beans;

import java.util.ArrayList;

public class Order {
	
	private String orderID; 
	private String restaurantName;
	private String nameAndSurname;
	private String status;
	private String dateAndTime;
	private double price;
	
	private ArrayList<ShoppingCartItem> items;

	public Order(String orderID, String restaurantName, String nameAndSurname, String status, String dateAndTime,
			double price) {
		super();
		this.orderID = orderID;
		this.restaurantName = restaurantName;
		this.nameAndSurname = nameAndSurname;
		this.status = status;
		this.dateAndTime = dateAndTime;
		this.price = price;
		this.items = new ArrayList<ShoppingCartItem>();
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getNameAndSurname() {
		return nameAndSurname;
	}

	public void setNameAndSurname(String nameAndSurname) {
		this.nameAndSurname = nameAndSurname;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDateAndTime() {
		return dateAndTime;
	}

	public void setDateAndTime(String dateAndTime) {
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
}
