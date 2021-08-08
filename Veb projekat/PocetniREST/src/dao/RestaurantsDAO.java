package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Restaurant;
import beans.User;

public class RestaurantsDAO {

	private HashMap<String, Restaurant> restaurants = new HashMap<String, Restaurant>();
	//private String path = "C:\\Users\\User\\Desktop\\Web-projekat\\Veb projekat\\PocetniREST\\WebContent";	
	private String path = System.getProperty("catalina.base") + File.separator + "data" + File.separator + "restaurants.txt";
	
	public RestaurantsDAO() {
		BufferedReader in = null;
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
		}
	}
	
	private void readRestaurants(BufferedReader in) {
		String line, name = "", type = "", status = "";
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
				}
				Restaurant restaurant = new Restaurant(name, type, status);
				restaurants.put(name, restaurant);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	
	public void saveRestaurants() {
		BufferedWriter out = null;
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
		}		
	}
	
	private String writeRestaurant(Restaurant restaurant) {
		StringBuilder sb = new StringBuilder();
		
		sb.append(restaurant.getName() + ";");
		sb.append(restaurant.getType() + ";");
		sb.append(restaurant.getStatus() + ";");
		
		return sb.toString();
	}
	
	public Collection<Restaurant> getValues() {
		return restaurants.values();
	}
	
	public Restaurant getRestaurant(String id) {
		return restaurants.get(id);
	}
	
	
	public void addRestaurant(Restaurant restaurant) {
		restaurants.put(restaurant.getName(), restaurant);
		saveRestaurants();
	}
	
	public Restaurant getRestaurantByName(String name) {
		return restaurants.get(name);
	}

}
