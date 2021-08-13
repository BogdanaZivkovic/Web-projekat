package beans;

public class Item {
	private int itemID;
	private String name;
	private double price;
	private String type;
	private String restaurantName;
	private String quantity;
	private String description;
	private String logoPath;
	
	public Item() {
		
	}
	
	public Item(int itemID, String name, double price, String type, String restaurantName, String quantity, String description, String logoPath) {
		this.itemID = itemID;
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurantName = restaurantName;
		this.quantity = quantity;
		this.description = description;
		this.logoPath = logoPath;
	}
	
	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public int getItemID() {
		return itemID;
	}

	public void setItemID(int itemID) {
		this.itemID = itemID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
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
