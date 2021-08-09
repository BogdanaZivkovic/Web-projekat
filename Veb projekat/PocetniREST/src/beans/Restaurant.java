package beans;

public class Restaurant {
	
	private String name;
	private String type;
	private String status;
	private String managerUsername;
	
	
	public Restaurant() {
		
	}
	
	public Restaurant(String name, String type, String status, String managerUsername) {
		super();
		this.name = name;
		this.type = type;
		this.status = status;
		this.managerUsername = managerUsername;
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

	public String getManagerUsername() {
		return managerUsername;
	}

	public void setManagerUsername(String managerUsername) {
		this.managerUsername = managerUsername;
	}
}
