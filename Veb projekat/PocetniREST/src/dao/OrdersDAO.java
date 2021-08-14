package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Order;


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

	public void saveItems() {
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
}
