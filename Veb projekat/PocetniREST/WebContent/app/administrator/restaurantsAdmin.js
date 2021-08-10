Vue.component("restaurants-admin", {
	data: function() {
		return {
			restaurants: []
		}
	},
	template: `
	<div>
		<button @click="$router.push('/restaurantadmin')"> New restaurant </button>
		<ul>
			<li v-for ="restaurant in restaurants">
				<table>
					<tr>
						<td> Name of restaurant: </td>
						<td> {{restaurant.name}} </td>
					</tr>
					<tr>
						<td> Restaurant type: </td>
						<td> {{restaurant.type}} </td>
					</tr>
					<tr>
						<td> Restaurant status: </td>
						<td> {{restaurant.status}} </td>
					</tr>
					<tr>
						<td> Restaurant address: </td>
						<td> {{restaurant.location.address.city}} </td>
						<td> {{restaurant.location.address.street}} </td>
						<td> {{restaurant.location.address.number}} </td>
						<td> {{restaurant.location.address.zipCode}} </td>
					</tr>
				</table>
			</li>
		</ul>
	</div>
	`,
		
	mounted () {
		axios
          .get('rest/restaurants/getAllRestaurants')
          .then(response => (this.restaurants = response.data))
	},
});