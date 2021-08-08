Vue.component("all-restaurants-app", {
	data: function() {
		return {
			searchFields: {
				name: '',
				type: ''
			},
			restaurants: [],
			searchVisible: true
		}
	},
	template: `
	<div>
		<div v-if="searchVisible">
			<form method='post'>
				<input type="text" v-model="searchFields.name" placeholder="Naziv"></input>
				<br><br>
			</form>
		</div>
		
		<ul>
			<li v-for ="restaurant in filteredRestaurants">
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
	methods: {
		matchesSearch: function (restaurant) {
			if(!restaurant.name.match(this.searchFields.name))
				return false;
			return true;
		}
	},
	mounted () {
		axios
          .get('rest/restaurants/getAllRestaurants')
          .then(response => (this.restaurants = response.data))
	},
	computed: {
		filteredRestaurants: function() {
			return this.restaurants.filter((restaurant) => {
				return this.matchesSearch(restaurant);
			});
		}
	},
});