Vue.component("add-item-manager", {
	data: function() {
		return {
			item: {
				name: "",
				price: "",
				type: "",
				quantity: "",
				description: ""
			}
		}
	},
	template:`
	<div>
		<form @submit="addItem(item)" method='post'>
			<input type="text" v-model="item.name" placeholder="Name" required>
			<br><br>
			<input type="number" v-model="item.price" placeholder="Price" required>
			<br><br>
			<label>Type:</label>
			<select v-model="item.type">
		    	<option disabled value="">Please select one</option>
		    	<option> FOOD </option>
		    	<option> DRINK </option>
			</select>
			<input type="text" v-model="item.quantity" placeholder="Quantity" required>
			<br><br>
			<input type="text" v-model="item.description" placeholder="Description">
			<br><br>
			<button type='submit'> OK </button>
			<button @click="$router.push('/restaurantmanager')"> Cancel </button>
		</form>
	</div>
	`,
	methods: {
		addItem : function (item) {
			axios
			.post('rest/restaurants/addItem', {
				"name":''+item.name, 
				"price":''+item.price, 
				"type":''+item.type, 
				"quantity":''+item.quantity, 
				"description":''+item.description
			})
			this.$router.push('/restaurantmanager');
		}
	}
});