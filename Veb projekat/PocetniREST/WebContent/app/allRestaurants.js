Vue.component("all-restaurants-app", {
	data: function() {
		return {
			searchFields: {
				name: '',
				type: '',
				location: ''
			},
			filters: {
				type:'',
				status:''
			},
			restaurants: [],
			images: [],
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
			<button @click="sortNameAsc"> Name ascending </button>
			<button @click="sortNameDesc"> Name descending </button>
			<br><br>
			<button @click="sortLocationAsc"> Location ascending </button>
			<button @click="sortLocationDesc"> Location descending </button>
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
				<select v-model="filters.status">
					<option disabled value="">Please select one</option>
					<option value=""> All </option>
					<option> Open </option>
				</select>
			</form>
		</div>
		<ul>
			<li v-for ="restaurant in filteredRestaurants">
				<img height="200" width="350" v-bind:src="getLogoPath(restaurant)">
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
			if(!restaurant.status.toLowerCase().match(this.filters.status.toLowerCase()))
				return false;
			return true;
		},
		sortNameAsc: function () {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(a.name, b.name)});
		},
		sortNameDesc: function () {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(b.name, a.name)});
		},
		sortLocationAsc: function() {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(a.location.address.city, b.location.address.city)});
		},
		sortLocationDesc: function() {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(b.location.address.city, a.location.address.city)});
		},
		alphaNumCriterium: function (a,b) {
      		var reA = /[^a-zA-Z]/g;
      		var reN = /[^0-9]/g;
      		var aA = a.replace(reA, "");
      		var bA = b.replace(reA, "");
      		if(aA === bA) {
          		var aN = parseInt(a.replace(reN, ""), 10);
          		var bN = parseInt(b.replace(reN, ""), 10);
          		return aN === bN ? 0 : aN > bN ? 1 : -1;
      		} else {
          		return aA > bA ? 1 : -1;
      		}
    	},
		viewRestaurant: function (restaurant) {
			let data = restaurant;
      		this.$router.push({
        		name: "viewRestaurant",
       			params: { data }
      		});
		},
		getLogoPath: function (restaurant) {
            let imageDefault = "data:image/png;base64,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";

            if (restaurant.logoPath == "withoutPath")				
                return imageDefault;

            let retImage;

            retImage = this.getImageBase64FromId(parseInt(restaurant.logoPath, 10));

            return retImage;

        },
        getImageBase64FromId: function (idOfImage) {
            let base64Image;

            for (let el of this.images) {
                if (el.id == idOfImage) {
                    base64Image = el.base64;
                    break;
                }
            }
            return base64Image;
        }
	},
	mounted () {			
		axios
			.get('rest/restaurants/getAllRestaurants')
			.then(response => {
				this.restaurants = response.data
				this.restaurants.sort((a, b) => (a.status > b.status) ? -1 : 1);
				axios.get('rest/images/getImages')
				.then(response => (this.images = response.data));
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


/**
 * ref: https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
 * @param {*} element 
 */
function encodeImageFileAsURLForChanging(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log("\n ENKODIRANJE SLIKE \n");
        document.getElementById('imgForChangeID')
            .setAttribute(
                'src', reader.result
            );
    }
    reader.readAsDataURL(file);
}