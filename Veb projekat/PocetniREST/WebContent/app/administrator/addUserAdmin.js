Vue.component("add-user-admin", {
	data: function() {
		return {
			newUser: {
				userName: "",
				password: "",
				name: "",
				surname: "",
				gender: "",
				dateOfBirth: ""
			}
		}
	},
	template: `
    <div>
        <form @submit="register(newUser)" method='post'>
            <input type="text" v-model="newUser.userName" placeholder="Username" required>
			<br><br>
            <input type="text" v-model="newUser.name" placeholder="Name">
			<br><br>
            <input type="text" v-model="newUser.surname" placeholder="Surname">
			<br><br>
            <input type="password" v-model="newUser.password" placeholder="Password" required>
			<br><br>
			<label>Gender:</label>
			<select v-model="newUser.gender">
		    <option disabled value="">Please select one</option>
		    <option>Male</option>
		    <option>Female</option>
			</select>
			<br><br>
			<label for="start">Date of birth:</label>
			<input type="date" v-model="newUser.dateOfBirth" min="1950-01-01" max="2020-01-01">		
			<br><br>
			<label>Role:</label>
			<select v-model="newUser.role">
		    <option disabled value="">Please select one</option>
		    <option>CUSTOMER</option>
		    <option>MANAGER</option>
			<option>DELIVERER</option>
			</select>
			<br><br>	
            <button type='submit'> OK </button>
			<button @click="$router.push('/usersadmin')"> Cancel </button>
        </form>
    </div>
    `,
	methods: {
		register : function (newUser) {
			axios
			.post('rest/users/registration', {
				"userName":''+newUser.userName, 
				"password":''+newUser.password, 
				"name":''+newUser.name, 
				"surname":''+newUser.surname, 
				"gender":''+newUser.gender, 
				"dateOfBirth":''+newUser.dateOfBirth, 
				"role":''+newUser.role
			})
			this.$router.push('/usersadmin');
		}
	},
});