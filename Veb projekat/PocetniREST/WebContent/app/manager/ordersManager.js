Vue.component("orders-manager", {
	data: function() {
		return {
			orders: []	
		}
	},
	template:`
	<div>
		<ul>
			<li v-for = "order in orders">
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
				<button v-if="order.status.match('PROCESSING')" @click="prepareOrder(order)"> ACCEPT </button>
				<button v-if="order.status.match('IN_PREPARATION')" @click="orderReady(order)"> READY </button>
				<ul v-if="order.status.match('WAITING_FOR_DELIVERY')">
					<li v-for = "request in order.requests">
						{{request}}
						<button @click = "approveDelivery(order, request)"> APPROVE </button>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	`,
	methods: {
		approveDelivery : function (order, request) {
			axios
				.post('rest/orders/approveDelivery', {
					'orderID':''+order.orderID,
					'userName':''+request
				})
				.then(response => {this.init()})
		},
		prepareOrder: function (order) {
			axios
				.post('rest/orders/changeStatus', {
					'orderID':''+order.orderID,
					'status':'IN_PREPARATION'
				})
				.then(response => {this.init()})
		},
		orderReady: function (order) {
			axios
				.post('rest/orders/changeStatus', {
					'orderID':''+order.orderID,
					'status':'WAITING_FOR_DELIVERY'
				})
				.then(response => {this.init()})
		},
		formatDate: function(dateAndTime) {
			let d = new Date(dateAndTime);
			let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
			let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
			let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
			return (`${da}-${mo}-${ye}`);
		},
		init: function() {
			axios
			.get('rest/orders/getOrdersRestaurant')
			.then(response =>(this.orders = response.data))	
		}
	},
	mounted () {
		this.init();
	}
});