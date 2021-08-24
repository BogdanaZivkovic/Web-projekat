Vue.component("my-orders-deliverer", {
	data: function() {
		return {
			restaurants: [],
			orders: [],
			searchVisible: false,
			sortVisible: false,
			filterVisible: false,
			search: {
				restaurant:'',
				minPrice:'',
				maxPrice:'',
				minDate: '',
				maxDate:''
			},
			filter: {
				type:'',
				status:''
			}
		}
	},
	template:`
	<div>
		<button @click="searchVisible=!searchVisible">Search</button>
		<button @click="sortVisible=!sortVisible">Sort</button>
		<button @click="filterVisible=!filterVisible">Filter</button>
		<br><br>
		<div v-if="searchVisible">
			<input type="text" v-model="search.restaurant" placeholder="Restaurant">
			<br><br>
			<input type="number" v-model="search.minPrice" placeholder="Min price">
			<input type="number" v-model="search.maxPrice" placeholder="Max price">
			<br><br>
			<label> Min date: </label>
			<input type="date" v-model="search.minDate" placeholder="Min date">
			<label> Max date: </label>
			<input type="date" v-model="search.maxDate" placeholder="Max date">
			<br><br>
		</div>
		<div v-if="sortVisible">
			<button @click="sortRestaurantAsc"> Restaurant ascending </button>
			<button @click="sortRestaurantDesc"> Restaurant descending </button>
			<br><br>
			<button @click="sortPriceAsc"> Price ascending </button>
			<button @click="sortPriceDesc"> Price descending </button>
			<br><br>
			<button @click="sortDateAsc"> Date ascending </button>
			<button @click="sortDateDesc"> Date descending </button>
			<br><br>
		</div>
		<div v-if="filterVisible">
			<label> Restaurant type: </label>
			<select v-model="filter.type">
				<option disabled value="">Please select one</option>
				<option value="">All</option>
		   		<option>Chinese</option>
		   		<option>Italian</option>
				<option>Fast food</option>
				<option>BBQ</option>
				<option>Mexican</option>
				<option>Gyros</option>
			</select>
			<label> Order status: </label>
			<select v-model="filter.status">
				<option disabled value="">Please select one</option>
				<option value="">All</option>
				<option> PROCESSING </option>
				<option> IN_PREPARATION </option>
				<option> WAITING_FOR_DELIVERY </option>
				<option> IN_TRANSPORT </option>
				<option> DELIVERED </option>
				<option> CANCELED </option>
			</select>
		</div>
		<ul>
			<li v-for = "order in filteredOrders">
				<table>
					<tr>
						<td> Restaurant: </td>
						<td> {{order.restaurantName}} </td>
					</tr>
					<tr>
						<td> Status: </td>
						<td> {{order.status}} </td>
					</tr>
					<tr>
						<td> Date and time: </td>
						<td> {{formatDate(order.dateAndTime)}} </td>
					</tr>
					<tr>
						<td> Price: </td>
						<td> {{order.price}} </td>
					</tr>
				</table>
				<ul>
					<li v-for = "i in order.items">
						{{i.count}} * {{i.item.name}}
					</li>
				</ul>
				<button v-if="order.status.match('IN_TRANSPORT')" @click="deliverOrder(order)"> DELIVER </button>
			</li>
		</ul>
	</div>
	`,
	methods: {
		deliverOrder : function (order) {
			axios
				.post('rest/orders/changeStatus', {
					'orderID':''+order.orderID,
					'status':'DELIVERED'
				})
				.then(response => (this.init()))
		},
		formatDate: function(dateMillisec) {
			var date = new Date(dateMillisec)
			var hours = date.getHours();
  			var minutes = date.getMinutes();
  			var ampm = hours >= 12 ? 'pm' : 'am';
  			hours = hours % 12;
  			hours = hours ? hours : 12; // the hour '0' should be '12'
  			minutes = minutes < 10 ? '0'+minutes : minutes;
  			var strTime = hours + ':' + minutes + ' ' + ampm;
  			return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
		},
		init: function() {
			axios
				.get('rest/orders/getOrdersDeliverer')
				.then(response =>(this.orders = response.data))
			axios
				.get('rest/restaurants/getAllRestaurants')
				.then(response => (this.restaurants = response.data))
		},
		matchesSearch: function(order) {
			if(!order.restaurantName.toLowerCase().match(this.search.restaurant.toLowerCase()))
				return false;
			if(order.price < parseInt(this.search.minPrice, 10))
				return false;
			if(order.price > parseInt(this.search.maxPrice, 10))
				return false;
			if(order.dateAndTime < Date.parse(this.search.minDate))
				return false;
			if(order.dateAndTime > Date.parse(this.search.maxDate))
				return false;
			if(!order.status.match(this.filter.status))
				return false;
			let restaurant;
			for(let i =0; i < this.restaurants.length; i++) {
				if(this.restaurants[i].name.match(order.restaurantName)) {
					restaurant = this.restaurants[i];
					break;
				}
			}
			if(!restaurant.type.match(this.filter.type))
				return false;
			return true;
		},
		sortRestaurantAsc: function() {
			this.orders.sort((a, b) => {return this.alphaNumCriterium(a.restaurantName, b.restaurantName)})
		},
		sortRestaurantDesc: function() {
			this.orders.sort((a, b) => {return this.alphaNumCriterium(b.restaurantName, a.restaurantName)})
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
		sortPriceAsc: function() {
			this.orders.sort((a, b) => {return a.price - b.price})
		},
		sortPriceDesc: function() {
			this.orders.sort((a, b) => {return b.price - a.price})
		},
		sortDateAsc: function() {
			this.orders.sort((a,b) => {return a.dateAndTime - b.dateAndTime})
		},
		sortDateDesc: function() {
			this.orders.sort((a,b) => {return b.dateAndTime - a.dateAndTime})
		}
	},
	mounted () {
		this.init();
	},
	computed: {
		filteredOrders: function() {
			return this.orders.filter((order) => {
				return this.matchesSearch(order);
			});
		}
	}
});