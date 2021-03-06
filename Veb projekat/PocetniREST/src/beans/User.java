package beans;

import java.util.ArrayList;
import java.util.Collection;

public class User {
	private String userName;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private String dateOfBirth;
	private String role;
	private Boolean isDeleted;
	private double points;
	//private String customerType;
	private CustomerType customerType;
	private Boolean isBlocked;
	//orders for customer, approved deliveries for deliverer
	private Collection<String> orderIDs;
	
	public User() {
		
	}

	public User(String userName, String password, String name, String surname,
			String gender, String dateOfBirth, String role) {
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		isDeleted = false;
		this.points = 0.0;
		customerType = new CustomerType("UNDEFINED", 0.0, 0);
		isBlocked = false;
		orderIDs = new ArrayList<String>();
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public Collection<String> getOrderIDs() {
		return orderIDs;
	}

	public void setOrderIDs(Collection<String> orderIDs) {
		this.orderIDs = orderIDs;
	}
	
}
