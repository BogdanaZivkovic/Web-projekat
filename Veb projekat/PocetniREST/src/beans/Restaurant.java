package beans;

import java.util.ArrayList;
import java.util.Collection;

public class Restaurant {

	private String name;
	private String type;
	//Open, Closed
	private String status;
	private Location location;
	private String managerUsername;
	private String logoPath;
	private ArrayList<Integer> itemIDs;
	private Boolean isDeleted;
	private Double averageRating;
	private Collection<String> orderIDs;

	public Restaurant() {

	}

	public Restaurant(String name, String type, String status, Location location, String managerUsername, String logoPath) {
		super();
		this.name = name;
		this.type = type;
		this.status = status;
		this.location = location;
		this.managerUsername = managerUsername;
		this.logoPath = logoPath;
		this.itemIDs = new ArrayList<Integer>();
		isDeleted = false;
		averageRating = 0.0;
		orderIDs = new ArrayList<String>();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getManagerUsername() {
		return managerUsername;
	}

	public void setManagerUsername(String managerUsername) {
		this.managerUsername = managerUsername;
	}

	public ArrayList<Integer> getItemIDs() {
		return itemIDs;
	}

	public void setItemIDs(ArrayList<Integer> itemIDs) {
		this.itemIDs = itemIDs;
	}

	public void addItemID(int itemID) {
		itemIDs.add(itemID);
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	public Double getAverageRating() {				
		return averageRating;
	}

	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}

	public Collection<String> getOrderIDs() {
		return orderIDs;
	}

	public void setOrderIDs(Collection<String> orderIDs) {
		this.orderIDs = orderIDs;
	}
}
