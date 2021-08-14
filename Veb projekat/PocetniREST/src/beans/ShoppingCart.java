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
		int exists = 0;
		int cnt = 0;
		for (ShoppingCartItem shoppingCartItem : items) {
			if(shoppingCartItem.getItem().getItemID()==item.getItem().getItemID()) {
				exists = 1;
				break;
			}
			else {
				cnt+=1;
			}
		}
		
		if(exists==0) {
			items.add(item);
		}
		else {			
			items.get(cnt).setCount(items.get(cnt).getCount()+item.getCount());
		}
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
