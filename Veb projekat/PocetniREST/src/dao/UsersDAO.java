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

import beans.User;

public class UsersDAO {

	private HashMap<String, User> users = new HashMap<String, User>();
	private String path = "C:\\Users\\User\\Desktop\\Web-projekat\\Veb projekat\\PocetniREST\\WebContent";
	//private String path = ".\\Veb projekat\\PocetniREST\\WebContent";
	
	public UsersDAO() {
		BufferedReader in = null;
		try {
			File file = new File(path + "/users.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			readUsers(in);
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
	
	private void readUsers(BufferedReader in) {
		String line, userName = "", password = "", name = "", surname = "", gender = "", dateOfBirth = "", role = "";
		StringTokenizer st;
		try {
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					userName = st.nextToken().trim();
					password = st.nextToken().trim();
					name = st.nextToken().trim();
					surname = st.nextToken().trim();
					gender = st.nextToken().trim();
					dateOfBirth = st.nextToken().trim();
					role = st.nextToken().trim();
				}
				User user = new User(userName, password, name, surname, gender, dateOfBirth, role);
				users.put(userName, user);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void saveUsers() {
		BufferedWriter out = null;
		try {
			out = Files.newBufferedWriter(Paths.get(path + "/users.txt"), StandardCharsets.UTF_8);
			for (User user : users.values()) {
				out.write(writeUser(user));
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

	private String writeUser(User user) {
		StringBuilder sb = new StringBuilder();
		
		sb.append(user.getUserName() + ";");
		sb.append(user.getPassword() + ";");
		sb.append(user.getName() + ";");
		sb.append(user.getSurname() + ";");
		sb.append(user.getGender() + ";");
		sb.append(user.getDateOfBirth() + ";");
		sb.append(user.getRole() + ";");
		
		return sb.toString();
	}
	
	public Collection<User> getValues() {
		return users.values();
	}
	
	public User getUser(String id) {
		return users.get(id);
	}
	
	
	public void addUser(User user) {
		users.put(user.getUserName(), user);
		saveUsers();
	}
	
	public User getUserByUsername(String username) {
		return users.get(username);
	}
}
