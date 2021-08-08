Vue.component("restaurant-admin", {
	data: function() {
		return {
			newRestaurant: {
				name: "",
				type: "",
				status: ""
			}
		}
	},
	template: `
    <div>
        <form id='newRestaurant-form' @submit="createRestaurant(newRestaurant)" method='post'>
			<h3>Kreiranje novog restorana</h3>
            <input type="text" v-model="newRestaurant.name" placeholder="Name" required>
			<br><br>
            <input type="text" v-model="newRestaurant.type" placeholder="Type">
			<br><br>
            <input type="text" v-model="newRestaurant.status" placeholder="Status">
			<br><br>
            <button type='submit'> CREATE RESTAURANT </button>
        </form>
    </div>
    `,
	methods: {
		createRestaurant : function (newRestaurant) {
			axios
			.post('rest/restaurants/create', {
				"name":''+newRestaurant.name, 
				"type":''+newRestaurant.type, 
				"status":''+newRestaurant.status 
			})
		}
	},
});