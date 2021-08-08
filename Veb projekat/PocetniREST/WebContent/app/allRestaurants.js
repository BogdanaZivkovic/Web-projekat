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
		<button @click="sortAlphanumeric"> Sort alphanumeric </button>
		<button @click="sortAlphanumericReverse"> Sort alphanumeric reverse </button>
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