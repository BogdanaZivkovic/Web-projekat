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

import beans.Address;
import beans.Location;
import beans.Restaurant;
import dto.RestaurantDTO;

public class RestaurantsDAO {

	private HashMap<String, Restaurant> restaurants = new HashMap<String, Restaurant>();
	private String path = System.getProperty("catalina.base") + File.separator + "data" + File.separator + "restaurants.json";

	public RestaurantsDAO() {
		/*BufferedReader in = null;
		try {
			File file = new File(path);
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			readRestaurants(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}*/
		readRestaurants();
	}

	private void readRestaurants() {
		/*String line, name = "", type = "", status = "";
		StringTokenizer st;
		try {
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					name = st.nextToken().trim();
					type = st.nextToken().trim();
					status = st.nextToken().trim();
					managerUsername = st.nextToken().trim();
				}
				Restaurant restaurant = new Restaurant(name, type, status, managerUsername);
				restaurants.put(name, restaurant);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}*/
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(this.path);

		List<Restaurant> loadedRestaurants = new ArrayList<Restaurant>();
		try {

			loadedRestaurants = objectMapper.readValue(file, new TypeReference<List<Restaurant>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Restaurant r : loadedRestaurants) {
			restaurants.put(r.getName(), r);
		}
	}


	public void saveRestaurants() {
		/*BufferedWriter out = null;
		try {
			out = Files.newBufferedWriter(Paths.get(path), StandardCharsets.UTF_8);
			for (Restaurant restaurant : restaurants.values()) {
				out.write(writeRestaurant(restaurant));
				out.newLine();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				try {
					out.flush();
					out.close();
				} catch (Exception e) {
				}
			}
		}*/
		List<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		for (Restaurant r : getValues()) {
			allRestaurants.add(r);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(this.path), allRestaurants);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/*private String writeRestaurant(Restaurant restaurant) {
		StringBuilder sb = new StringBuilder();

		sb.append(restaurant.getName() + ";");
		sb.append(restaurant.getType() + ";");
		sb.append(restaurant.getStatus() + ";");
		sb.append(restaurant.getManagerUsername() + ";");

		return sb.toString();
	}*/

	public Collection<Restaurant> getValues() {
		return restaurants.values();
	}

	public Restaurant getRestaurant(String id) {
		return restaurants.get(id);
	}


	public void addRestaurant(RestaurantDTO dto) {
		Location location = new Location("0", "0", new Address(dto.city, dto.street, dto.number, dto.zipCode));
		Restaurant restaurant = new Restaurant(dto.name, dto.type, dto.status, location, dto.managerUsername);
		restaurants.put(restaurant.getName(), restaurant);
		saveRestaurants();
	}

	public Restaurant getActiveRestaurant(String name) {
		Restaurant restaurant = getRestaurant(name);
		if(restaurant == null || restaurant.getIsDeleted() == true)
			return null;
		return restaurant;
	}
	
	public Restaurant getRestaurantByManager(String managerUsername) {
		for (Restaurant restaurant : getActiveRestaurants())
			if(restaurant.getManagerUsername().equals(managerUsername) && !restaurant.getIsDeleted())
				return restaurant;
		return null;
	}
	
	public void addItem(String restaurantName, int itemID) {
		Restaurant restaurant = restaurants.get(restaurantName);
		restaurant.addItemID(itemID);
		saveRestaurants();
	}
	
	public Collection<Restaurant> getActiveRestaurants() {
		Collection<Restaurant> ret = new ArrayList<Restaurant>();
		for(Restaurant restaurant : getValues())
			if(!restaurant.getIsDeleted())
				ret.add(restaurant);
		return ret;
	}
	
	public void deleteLogically(String name) {
		restaurants.get(name).setIsDeleted(true);
		saveRestaurants();
	}
}
