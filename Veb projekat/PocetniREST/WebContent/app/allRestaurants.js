Vue.component("all-restaurants-app", {
	data: function() {
		return {
			restaurants: []
		}
	},
	template: `
	<div>
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
				</table>
			</li>
		</ul>
	`,
	mounted () {
		axios
          .get('rest/restaurants/getAllRestaurants')
          .then(response => (this.restaurants = response.data))
	},
});