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

import beans.User;
import dto.UserDTO;

public class UsersDAO {

	private HashMap<String, User> users = new HashMap<String, User>();
	private String path = System.getProperty("catalina.base") + File.separator + "data" + File.separator + "users.json";

	public UsersDAO() {
		/*BufferedReader in = null;
		try {
			File file = new File(path);
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
		}*/
		readUsers();
	}

	private void readUsers() {
		/*String line, userName = "", password = "", name = "", surname = "", gender = "", dateOfBirth = "", role = "";
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
		}*/
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(this.path);

		List<User> loadedUsers = new ArrayList<User>();
		try {

			loadedUsers = objectMapper.readValue(file, new TypeReference<List<User>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (User u : loadedUsers) {
			users.put(u.getUserName(), u);
		}
	}

	public void saveUsers() {
		/*BufferedWriter out = null;
		try {
			out = Files.newBufferedWriter(Paths.get(path), StandardCharsets.UTF_8);
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
		}*/
		List<User> allUsers = new ArrayList<User>();
		for (User u : getValues()) {
			allUsers.add(u);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(this.path), allUsers);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/*private String writeUser(User user) {
		StringBuilder sb = new StringBuilder();

		sb.append(user.getUserName() + ";");
		sb.append(user.getPassword() + ";");
		sb.append(user.getName() + ";");
		sb.append(user.getSurname() + ";");
		sb.append(user.getGender() + ";");
		sb.append(user.getDateOfBirth() + ";");
		sb.append(user.getRole() + ";");

		return sb.toString();
	}*/

	public Collection<User> getValues() {
		return users.values();
	}

	public User getUser(String id) {
		return users.get(id);
	}


	public void addUser(UserDTO dto) {
		User user = new User(dto.userName, dto.password, dto.name, dto.surname, dto.gender, dto.dateOfBirth, dto.role);
		users.put(user.getUserName(), user);
		saveUsers();
	}

	public User getUserByUsername(String username) {
		return users.get(username);
	}
	
	public void updateUser(UserDTO dto) {
		User user = getUserByUsername(dto.userName);
		user.setPassword(dto.password);
		user.setName(dto.name);
		user.setSurname(dto.surname);
		user.setGender(dto.gender);
		user.setDateOfBirth(dto.dateOfBirth);
		user.setRole(dto.role);
	}
}
