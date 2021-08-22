Vue.component("orders-customer", {
	data: function() {
		return {
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
						<td> {{foo(order.dateAndTime)}} </td>
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
				<button v-if="order.status.match('PROCESSING')" @click="cancelOrder(order)"> CANCEL </button>
			</li>
		</ul>
	</div>
	`,
	methods: {
		cancelOrder: function (order) {
			axios
				.post('rest/orders/changeStatus', {
					'orderID':''+order.orderID,
					'status':'CANCELED'
				})
				
			axios
				.post('rest/orders/removePoints', {
					'orderID':''+order.orderID,
					'status':'CANCELED'
				})
				.then(response => {this.init()})
		},
		foo: function(dateAndTime) {
			let d = new Date(dateAndTime);
			let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
			let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
			let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
			return (`${da}-${mo}-${ye}`);
		},		
		init: function() {
			axios
				.get('rest/orders/getMyOrders')
				.then(response =>(this.orders = response.data))
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
			return true;
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