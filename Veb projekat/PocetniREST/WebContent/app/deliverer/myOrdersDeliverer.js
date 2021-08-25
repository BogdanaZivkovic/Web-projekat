Vue.component("my-orders-deliverer", {
	data: function() {
		return {
			orders: [],
			ordersWithRestaurant: [],
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
			<li v-for = "orderWithRestaurant in filteredOrdersWithRestaurant">
				<table>
					<tr>
						<td> Restaurant: </td>
						<td> {{orderWithRestaurant.order.restaurantName}} </td>
					</tr>
					<tr>
						<td> Status: </td>
						<td> {{orderWithRestaurant.order.status}} </td>
					</tr>
					<tr>
						<td> Date and time: </td>
						<td> {{formatDate(orderWithRestaurant.order.dateAndTime)}} </td>
					</tr>
					<tr>
						<td> Price: </td>
						<td> {{orderWithRestaurant.order.price}} </td>
					</tr>
					<tr>
						<td> Restaurant type: </td>
						<td> {{orderWithRestaurant.restaurant.type}} </td>
					</tr>
				</table>
				<ul>
					<li v-for = "i in orderWithRestaurant.order.items">
						{{i.count}} * {{i.item.name}}
					</li>
				</ul>
				<button v-if="order.status == 'IN_TRANSPORT'" @click="deliverOrder(orderWithRestaurant.order)"> DELIVER </button>
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
				.then(response => {
					this.orders = response.data;
					axios
						.get('rest/restaurants/getAllRestaurants')
						.then(response => {
							response.data.forEach(el => {
								for(let i =0; i < this.orders.length; i++) {
									if(el.name == this.orders[i].restaurantName) {
										let orderWithRestaurant = {order: this.orders[i], restaurant: el}
										this.ordersWithRestaurant.push(orderWithRestaurant);
									}
								}
							})
						})
				})
		},
		matchesSearch: function(orderWithRestaurant) {
			if(!orderWithRestaurant.order.restaurantName.toLowerCase().match(this.search.restaurant.toLowerCase()))
				return false;
			if(orderWithRestaurant.order.price < parseInt(this.search.minPrice, 10))
				return false;
			if(orderWithRestaurant.order.price > parseInt(this.search.maxPrice, 10))
				return false;
			if(orderWithRestaurant.order.dateAndTime < Date.parse(this.search.minDate))
				return false;
			if(orderWithRestaurant.order.dateAndTime > Date.parse(this.search.maxDate))
				return false;
			if(!orderWithRestaurant.order.status.match(this.filter.status))
				return false;
			if(!orderWithRestaurant.restaurant.type.match(this.filter.type))
				return false;
			return true;
		},
		sortRestaurantAsc: function() {
			this.ordersWithRestaurant.sort((a, b) => {return this.alphaNumCriterium(a.order.restaurantName, b.order.restaurantName)})
		},
		sortRestaurantDesc: function() {
			this.ordersWithRestaurant.sort((a, b) => {return this.alphaNumCriterium(b.order.restaurantName, a.order.restaurantName)})
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
			this.ordersWithRestaurant.sort((a, b) => {return a.order.price - b.order.price})
		},
		sortPriceDesc: function() {
			this.ordersWithRestaurant.sort((a, b) => {return b.order.price - a.order.price})
		},
		sortDateAsc: function() {
			this.ordersWithRestaurant.sort((a,b) => {return a.order.dateAndTime - b.order.dateAndTime})
		},
		sortDateDesc: function() {
			this.ordersWithRestaurant.sort((a,b) => {return b.order.dateAndTime - a.order.dateAndTime})
		}
	},
	mounted () {
		this.init();
	},
	computed: {
		filteredOrdersWithRestaurant: function() {
			return this.ordersWithRestaurant.filter((orderWithRestaurant) => {
				return this.matchesSearch(orderWithRestaurant);
			});
		}
	}
});