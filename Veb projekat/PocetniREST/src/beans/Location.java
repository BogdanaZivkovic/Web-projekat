package beans;

public class Location {
	
	private String latitude;
	private String longitude;
	private String address;
	
	public Location() {
		
	}
	
	public Location(String latitude, String longitude, String address) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
		this.address = address;
	}
	
	public String getLatitude() {
		return latitude;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}	
}
