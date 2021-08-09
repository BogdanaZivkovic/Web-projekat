package beans;

public class Item {
	private String name;
	private String price;
	private String type;
	private String restaurantName;
	private String quantity;
	private String description;
	
	public Item() {
		
	}
	
	public Item(String name, String price, String type, String restaurantName, String quantity, String description) {
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurantName = restaurantName;
		this.quantity = quantity;
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
