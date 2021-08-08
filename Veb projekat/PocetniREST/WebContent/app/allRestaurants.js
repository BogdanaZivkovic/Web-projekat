Vue.component("all-restaurants-app", {
	data: function() {
		return {
			restaurants: []
		}
	},
	template: `
	<div>
		<table>
			<tr>
				<th> Name </th>
				<th> Type </th>
				<th> Status </th>
			</tr>
			<tr v-for="restaurant in restaurants">
				<td> {{restaurant.name}} </td>
				<td> {{restaurant.type}} </td>
				<td> {{restaurant.status}} </td>
			</tr>
		</table>
	</div>
	`,
	mounted () {
		axios
          .get('rest/restaurants/getAllRestaurants')
          .then(response => (this.restaurants = response.data))
	},
});