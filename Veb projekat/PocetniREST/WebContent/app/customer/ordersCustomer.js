Vue.component("orders-customer", {
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
		}
	},
	mounted () {
		this.init();
	}
});