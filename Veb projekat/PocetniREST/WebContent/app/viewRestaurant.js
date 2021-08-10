Vue.component("view-restaurant", {
	data: function() {
		return {
			restaurant: {},
			items: []
		}
	},
	template:`
		<div>
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
	`,
	mounted() {
		this.restaurant = this.$route.params.data;
		axios
          .get('rest/items/getAllItems')
          .then(response => {
			response.data.forEach(el => {
				if (el.restaurantName == this.restaurant.name) {
					this.items.push(el);
				}
			})
		})
	}
});