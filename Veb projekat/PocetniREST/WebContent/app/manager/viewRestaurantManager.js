Vue.component("view-restaurant-manager", {
	data: function() {
		return {
			restaurant: {},
			items: []
		}
	},
	template:`
	<div>
		<h3> My restaurant </h3>
		<div v-if="restaurant.name != null">
			<table>
				<tr>
					<td> Name: </td>
					<td> {{restaurant.name}} </td>
				</tr>
				<tr>
					<td> Type: </td>
					<td> {{restaurant.type}} </td>
				</tr>
				<tr>
					<td> Status: </td>
					<td> {{restaurant.status}} </td>
				</tr>
				<tr>
					<td> Location: </td>
					<td v-if="restaurant.location != null"> {{restaurant.location.address.street}} {{restaurant.location.address.number}}, {{restaurant.location.address.zipCode}} {{restaurant.location.address.city}} </td>
					<td v-else>-</td>
				</tr>
			</table>
			<button @click="newItem"> New item </button>
			<ul>
				<li v-for="item in items">
					<table>
						<tr>
							<td> Name: </td>
							<td> {{item.name}} </td>
						</tr>
						<tr>
							<td> Price: </td>
							<td> {{item.price}} </td>
						</tr>
						<tr>
							<td> Type: </td>
							<td> {{item.type}} </td>
						</tr>
						<tr>
							<td> Quantity: </td>
							<td> {{item.quantity}} </td>
						</tr>
						<tr>
							<td> Description: </td>
							<td> {{item.description}} </td>
						</tr>
					</table>
				</li>
			</ul>
		</div>
		<h3 v-else>You are not assigned to a restaurant</h3>
	</div>
	`,
	methods: {
		newItem: function () {
			let data = this.restaurant.name;
      		this.$router.push({
        		name: "addItem", //use name for router push
       			params: { data }
      		});
		}
	},
	mounted() {
		axios
			.get('rest/restaurants/getMyRestaurant')
			.then(response => {
				this.restaurant = response.data
				axios
					.get('rest/items/getAllItems')
					.then(response => {
						response.data.forEach(el => {
							if (el.restaurantName == this.restaurant.name) {
								this.items.push(el);
							}
						})
					})	
			})
	}
});