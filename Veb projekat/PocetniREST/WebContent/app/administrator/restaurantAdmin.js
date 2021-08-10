Vue.component("restaurant-admin", {
	data: function() {
		return {
			managers: [],
			newRestaurant: {
				name: "",
				type: "",
				status: "",
				managerUsername: "",
				city:"",
				street:"",
				number:"",
				zipCode:""
			},
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
        <form id='newRestaurant-form' @submit="createRestaurant(newRestaurant, newUser)" method='post'>
			<h3>New restaurant</h3>
            <input type="text" v-model="newRestaurant.name" placeholder="Name" required>
			<br><br>
			<select v-model="newRestaurant.type">
		    <option disabled value="">Please select one</option>
		    <option>Chinese</option>
		    <option>Italian</option>
			<option>Fast food</option>
			<option>BBQ</option>
			<option>Mexican</option>
			<option>Gyros</option>
			</select>
			<br><br>
			<input type="text" v-model="newRestaurant.city" placeholder="Place" required>
			<br><br>
			<input type="text" v-model="newRestaurant.street" placeholder="Street" required>
			<input type="text" v-model="newRestaurant.number" placeholder="Number" required>
			<input type="text" v-model="newRestaurant.zipCode" placeholder="ZipCode" required>
			<label v-if="managers.length!=0" > Select manager </label>
			<select v-if="managers.length!=0" v-model="newRestaurant.managerUsername">
		    		<option v-for="manager in managers" v-bind:value=manager.userName>
                        {{ manager.name + " " + manager.surname}}
                    </option>
			</select>
			<br><br>
			<div v-if="managers.length==0">
				<label>There are no available managers. Register a new manager for this restaurant. </label>
				<br><br>
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
				<br><br>
			</div>
            <button type='submit'> CREATE RESTAURANT </button>
			<button @click="$router.push('/restaurantsadmin')"> Cancel </button>
        </form>
    </div>
    `,
	methods: {
		createRestaurant : function (newRestaurant, newUser) {
			
			if(this.managers.length != 0) {
			axios
			.post('rest/restaurants/create', {
				"name":''+newRestaurant.name, 
				"type":''+newRestaurant.type, 
				"status":''+"Open",
				"managerUsername":''+newRestaurant.managerUsername,
				"street":''+newRestaurant.street,
				"number":''+newRestaurant.number,
				"city":''+newRestaurant.city,
				"zipCode":''+newRestaurant.zipCode
				
			})
			}
			
			else {
				axios.all([
			axios
			.post('rest/restaurants/create', {
				"name":''+newRestaurant.name, 
				"type":''+newRestaurant.type, 
				"status":''+"Open",
				"managerUsername":''+newUser.userName,
				"street":''+newRestaurant.street,
				"number":''+newRestaurant.number,
				"city":''+newRestaurant.city,
				"zipCode":''+newRestaurant.zipCode
				}),
			axios
			.post('rest/users/registration', {
				"userName":''+newUser.userName, 
				"password":''+newUser.password, 
				"name":''+newUser.name, 
				"surname":''+newUser.surname, 
				"gender":''+newUser.gender, 
				"dateOfBirth":''+newUser.dateOfBirth, 
				"role":''+"MANAGER"
				})
			])
		}			
			
		this.$router.push('/restaurantsadmin');
		}	
	},
	
	mounted () {
		axios
          .get('rest/users/getAvailableManagers')
          .then(response => (this.managers = response.data))
	}
});