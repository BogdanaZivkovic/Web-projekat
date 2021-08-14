package beans;

import java.util.ArrayList;

public class ShoppingCart {
	private String customerUsername;
	private double totalPrice;
	private ArrayList<ShoppingCartItem> items;
	
	public ShoppingCart(String customerUsername) {
		items = new ArrayList<ShoppingCartItem>();
		this.customerUsername = customerUsername;
		totalPrice = 0;
	}
	
	public void addItem(ShoppingCartItem item) {
		items.add(item);
		totalPrice += item.getTotal();		
	}
	
	public ArrayList<ShoppingCartItem> getItems() {
		return items;
	}

	public String getCustomerUsername() {
		return customerUsername;
	}

	public double getTotalPrice() {
		return totalPrice;
	}
}
