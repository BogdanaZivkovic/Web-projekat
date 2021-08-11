Vue.component("all-restaurants-app", {
	data: function() {
		return {
			searchFields: {
				name: '',
				type: '',
				location: ''
			},
			filters: {
				type:''
			},
			restaurants: [],
			searchVisible: false,
			sortVisible: false,
			filterVisible: false
		}
	},
	template: `
	<div>
		<button @click="searchVisible=!searchVisible">Search</button>
		<button @click="sortVisible=!sortVisible">Sort</button>
		<button @click="filterVisible=!filterVisible">Filter</button>
		<br><br>
		<div v-if="searchVisible">
			<form method='post'>
				<input type="text" v-model="searchFields.name" placeholder="Restaurant name"></input>
				<br><br>
				<input type="text" v-model="searchFields.type" placeholder="Restaurant type"></input>
				<br><br>
				<input type="text" v-model="searchFields.location" placeholder="Restaurant location"></input>
				<br><br>
			</form>
		</div>
		<div v-if="sortVisible">
			<button @click="sortNameAsc"> Sort alphanumeric </button>
			<button @click="sortNameDesc"> Sort alphanumeric reverse </button>
			<br><br>
		</div>
		<div v-if="filterVisible">
			<form method='post'>
				<select v-model="filters.type">
		    		<option disabled value="">Please select one</option>
					<option value="">All</option>
		    		<option>Chinese</option>
		    		<option>Italian</option>
					<option>Fast food</option>
					<option>BBQ</option>
					<option>Mexican</option>
					<option>Gyros</option>
				</select>
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
			if(!restaurant.name.toLowerCase().match(this.searchFields.name.toLowerCase()))
				return false;
			if(!restaurant.type.toLowerCase().match(this.searchFields.type.toLowerCase()))
				return false;
			if(!restaurant.location.address.city.toLowerCase().match(this.searchFields.location.toLowerCase()))
				return false;
			if(!restaurant.type.toLowerCase().match(this.filters.type.toLowerCase()))
				return false;
			return true;
		},
		sortNameAsc: function () {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(a.name, b.name)});
		},
		sortNameDesc: function () {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(b.name, a.name)});
		},
		alphaNumCriterium: function (a,b) {
      		var reA = /[^a-zA-Z]/g;
      		var reN = /[^0-9]/g;
      		var aA = a.replace(reA, "");
      		var bA = b.replace(reA, "");
      		if(aA === bA) {
          		var aN = parseInt(a.replace(reN, ""), 10);
          		var bN = parseInt(b.replace(reN, ""), 10);
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