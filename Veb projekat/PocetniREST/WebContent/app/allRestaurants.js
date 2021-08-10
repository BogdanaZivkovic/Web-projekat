Vue.component("all-restaurants-app", {
	data: function() {
		return {
			searchFields: {
				name: '',
				type: ''
			},
			restaurants: [],
			searchVisible: false
		}
	},
	template: `
	<div>
		<button @click="searchVisible=!searchVisible">Search</button>
		<br><br>
		<div v-if="searchVisible">
			<form method='post'>
				<input type="text" v-model="searchFields.name" placeholder="Naziv"></input>
				<br><br>
			</form>
			<button @click="sortAlphanumeric"> Sort alphanumeric </button>
			<br><br>
			<button @click="sortAlphanumericReverse"> Sort alphanumeric reverse </button>
			<br><br>
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
					<tr>
						<td> Restaurant address: </td>
						<td> {{restaurant.location.address.city}} </td>
						<td> {{restaurant.location.address.street}} </td>
						<td> {{restaurant.location.address.number}} </td>
						<td> {{restaurant.location.address.zipCode}} </td>
					</tr>
				</table>
				<button @click= "viewRestaurant(restaurant)" > View </button>
			</li>
		</ul>
	`,
	methods: {
		matchesSearch: function (restaurant) {
			if(!restaurant.name.match(this.searchFields.name))
				return false;
			return true;
		},
		sortAlphanumeric: function () {
			this.restaurants.sort(this.alphaNumCriterium);
		},
		sortAlphanumericReverse: function () {
			this.restaurants.sort(this.reverseAlphaNumCriterium);
		},
		alphaNumCriterium: function (a,b) {
      		var reA = /[^a-zA-Z]/g;
      		var reN = /[^0-9]/g;
      		var aA = a.name.replace(reA, "");
      		var bA = b.name.replace(reA, "");
      		if(aA === bA) {
          		var aN = parseInt(a.name.replace(reN, ""), 10);
          		var bN = parseInt(b.name.replace(reN, ""), 10);
          		return aN === bN ? 0 : aN > bN ? 1 : -1;
      		} else {
          		return aA > bA ? 1 : -1;
      		}
    	},
		reverseAlphaNumCriterium: function (a,b) {
      		var reA = /[^a-zA-Z]/g;
      		var reN = /[^0-9]/g;
      		var aA = a.name.replace(reA, "");
      		var bA = b.name.replace(reA, "");
      		if(aA === bA) {
          		var aN = parseInt(a.name.replace(reN, ""), 10);
          		var bN = parseInt(b.name.replace(reN, ""), 10);
          		return aN === bN ? 0 : aN > bN ? -1 : 1;
      		} else {
          		return aA > bA ? -1 : 1;
      		}
    	},
		viewRestaurant: function (restaurant) {
			let data = restaurant;
      		this.$router.push({
        		name: "viewRestaurant", //use name for router push
       			params: { data }
      		});
		}
	},
	mounted () {
		axios
          .get('rest/restaurants/getAllRestaurants')
          .then(response => {
				this.restaurants = response.data
				this.restaurants.sort((a, b) => (a.status > b.status) ? -1 : 1);
				})

	},
	computed: {
		filteredRestaurants: function() {
			return this.restaurants.filter((restaurant) => {
				return this.matchesSearch(restaurant);
			});
		}
	},
});