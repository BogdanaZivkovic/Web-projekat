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
				<button @click="deleteRestaurant(restaurant)"> Delete </button>
			</li>
		</ul>
	</div>
	`,
	methods: {
		init : function() {
			axios
          	.get('rest/restaurants/getAllRestaurants')
          	.then(response => (this.restaurants = response.data))	
		},
		deleteRestaurant : function (restaurant) {
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/restaurants/delete', {
					"name":''+restaurant.name
				})
				.then(response => (this.init()))
			}
		}
	},
	mounted () {
		this.init();
	},
});