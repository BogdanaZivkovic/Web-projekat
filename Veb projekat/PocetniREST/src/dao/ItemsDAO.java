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

import beans.Item;
import dto.ItemDTO;

public class ItemsDAO {
	private HashMap<Integer, Item> items = new HashMap<Integer, Item>();
	private String path = System.getProperty("catalina.base") + File.separator + "data" + File.separator + "items.json";

	public ItemsDAO() {

		readItems();
	}

	private void readItems() {
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(this.path);

		List<Item> loadedItems = new ArrayList<Item>();
		try {

			loadedItems = objectMapper.readValue(file, new TypeReference<List<Item>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Item i : loadedItems) {
			items.put(i.getID(), i);
		}
	}

	public void saveItems() {
		List<Item> allItems = new ArrayList<Item>();
		for (Item i : getValues()) {
			allItems.add(i);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(this.path), allItems);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Collection<Item> getValues() {
		return items.values();
	}

	public Item getItem(int id) {
		return items.get(id);
	}

	public int addItem(ItemDTO dto, String restaurantName) {
		Item item = new Item(items.size(), dto.name, dto.price, dto.type, restaurantName, dto.quantity, dto.description);
		items.put(item.getID(), item);
		saveItems();
		return item.getID();
	}
	
	public Collection<Item> getItemsForRestaurant(String restaurantName) {
		Collection<Item> items = new ArrayList<Item>();
		for (Item i : getValues()) {
			if(i.getRestaurantName().equals(restaurantName)) {
				items.add(i);
			}
		}
		return items;
	}
}
