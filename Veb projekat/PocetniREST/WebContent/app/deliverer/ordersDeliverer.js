Vue.component("orders-deliverer", {
	data: function() {
		return {
			orders: [],
			usename: ''	
		}
	},
	template:`
	<div>
		{{username}}
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
				<label v-if = "order.requests.includes(username)"> Request sent </label>
				<button v-else @click="requestDelivery(order)"> REQUEST </button>
			</li>
		</ul>
	</div>
	`,
	methods: {
		requestDelivery: function (order) {
			axios
				.post('rest/orders/requestDelivery', {
					orderID:''+order.orderID
				})
				.then(response => (this.init()))
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
				.get('rest/orders/getWaiting')
				.then(response =>(this.orders = response.data))
			axios
				.get('rest/profile/getUser')
				.then(response => (this.username = response.data.userName))	
		}
	},
	mounted () {
		this.init();
	}
});