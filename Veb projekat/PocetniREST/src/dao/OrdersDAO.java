package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Order;
import beans.ShoppingCart;
import dto.OrderStatusDTO;


public class OrdersDAO {
	private HashMap<String, Order> orders = new HashMap<String, Order>();
	private String path = System.getProperty("catalina.base") + File.separator + "data" + File.separator + "orders.json";

	public OrdersDAO() {

		readOrders();
	}

	private void readOrders() {
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(this.path);

		List<Order> loadedOrders = new ArrayList<Order>();
		try {

			loadedOrders = objectMapper.readValue(file, new TypeReference<List<Order>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Order o : loadedOrders) {
			orders.put(o.getOrderID(), o);
		}
	}

	public void saveOrders() {
		List<Order> allOrders = new ArrayList<Order>();
		for (Order o : getValues()) {
			allOrders.add(o);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(this.path), allOrders);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Collection<Order> getValues() {
		return orders.values();
	}

	public Order getOrder(String id) {
		return orders.get(id);
	}
	
	public void createOrder(ShoppingCart sc) {
		String orderID = UUID.randomUUID().toString().substring(0, 10);
		while(orders.containsKey(orderID)) {
			orderID = UUID.randomUUID().toString().substring(0, 10);
		}
		Order order = new Order(orderID, sc.getRestaurantName(), sc.getCustomerUsername(), "PROCESSING", new Date(), sc.getTotalPrice(), sc.getItems());
		orders.put(orderID, order);
		
		saveOrders();
	}
	
	public Collection<Order> getOrdersForUser(String userName) {
		Collection<Order> ret = new ArrayList<Order>();
		for(Order order: getValues())
			if(order.getUserName().equals(userName))
				ret.add(order);
		return ret;
	}
	
	public Collection<Order> getOrdersForRestaurant(String restaurantName) {
		Collection<Order> ret = new ArrayList<Order>();
		for(Order order: getValues())
			if(order.getRestaurantName().equals(restaurantName))
				ret.add(order);
		return ret;
	}
	
	public Collection<Order> getWaiting() {
		Collection<Order> ret = new ArrayList<Order>();
		for(Order order: getValues())
			if(order.getStatus().equals("WAITING_FOR_DELIVERY"))
				ret.add(order);
		return ret;
	}
	
	public void changeStatus(OrderStatusDTO dto) {
		getOrder(dto.orderID).setStatus(dto.status);
		saveOrders();
	}
	
	public Collection<Order> getOrdersForDeliverer(String userName) {
		Collection<Order> ret = new ArrayList<Order>();
		for(Order order: getValues())
			if(order.getDeliverer().equals(userName))
				ret.add(order);
		return ret;
	}
	
	public boolean isUserSussy(String username) {
		int count = 0;
		Calendar c = Calendar.getInstance();
		c.setTime(new Date()); // Using today's date
		c.add(Calendar.DATE, -30); // Adding 5 days
		Date beginning = c.getTime();
		for(Order order : getValues()) {
			if(order.getUserName().equals(username) && order.getStatus().equals("CANCELED") && order.getDateAndTime().after(beginning))
				count++;
		}
		if(count >= 5)
			return true;
		return false;
	}
}
