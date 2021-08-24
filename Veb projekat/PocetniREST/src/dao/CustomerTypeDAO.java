package dao;

import java.util.Collection;
import java.util.HashMap;

import beans.CustomerType;

public class CustomerTypeDAO {
	
	private HashMap<String, CustomerType> customerTypes = new HashMap<String, CustomerType>();

	public CustomerTypeDAO() {
		CustomerType customerTypeGold = new CustomerType("GOLD", 15.0, 1000);
		CustomerType customerTypeSilver = new CustomerType("SILVER", 10.0, 500);
		CustomerType customerTypeBronze = new CustomerType("BRONZE", 5.0, 200);
		
		customerTypes.put("GOLD", customerTypeGold);
		customerTypes.put("SILVER", customerTypeSilver);
		customerTypes.put("BRONZE", customerTypeBronze);		
	}
	
	
	public Collection<CustomerType> getValues() {
		return customerTypes.values();
	}

	public CustomerType getCustomerType(String id) {
		return customerTypes.get(id);
	}
}
