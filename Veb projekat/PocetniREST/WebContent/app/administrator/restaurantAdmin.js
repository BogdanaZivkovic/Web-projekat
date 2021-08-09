Vue.component("restaurant-admin", {
	data: function() {
		return {
			managers: [],
			newRestaurant: {
				name: "",
				type: "",
				status: "",
				managerUsername: ""
			}
		}
	},
	template: `
    <div>
        <form id='newRestaurant-form' @submit="createRestaurant(newRestaurant)" method='post'>
			<h3>New restaurant</h3>
            <input type="text" v-model="newRestaurant.name" placeholder="Name" required>
			<br><br>
            <input type="text" v-model="newRestaurant.type" placeholder="Type">
			<br><br>
            <input type="text" v-model="newRestaurant.status" placeholder="Status">
			<br><br>
			<select v-model="newRestaurant.managerUsername">
		    		<option v-for="manager in managers" v-bind:value=manager.userName>
                        {{ manager.name + " " + manager.surname}}
                    </option>
			</select>
			<br><br>
            <button type='submit'> CREATE RESTAURANT </button>
			<button @click="$router.push('/restaurantsadmin')"> Cancel </button>
        </form>
    </div>
    `,
	methods: {
		createRestaurant : function (newRestaurant) {
			axios
			.post('rest/restaurants/create', {
				"name":''+newRestaurant.name, 
				"type":''+newRestaurant.type, 
				"status":''+newRestaurant.status,
				"managerUsername":''+newRestaurant.managerUsername
			})
			this.$router.push('/restaurantsadmin');
		}	
	},
	
	mounted () {
		axios
          .get('rest/users/getAvailableManagers')
          .then(response => (this.managers = response.data))
	}
});