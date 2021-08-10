Vue.component("view-restaurant-manager", {
	data: function() {
		return {
			restaurant: {}
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
			<button @click="$router.push('/additem')"> New item </button>
		</div>
		<h3 v-else>You are not assigned to a restaurant</h3>
	</div>
	`,
	mounted() {
		axios
			.get('rest/restaurants/getMyRestaurant')
			.then(response => this.restaurant = response.data)
	}
});