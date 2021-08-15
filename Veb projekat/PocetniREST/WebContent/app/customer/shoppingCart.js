Vue.component("shopping-cart", {
	data: function () {
		return {
			restaurant: {},
			sc: []
		}
	},
	template:`
	<div>
		<ul>
			<li v-for = "i in sc">
				<table>
					<tr>
						<td> Item name: </td>
						<td> {{i.item.name}} </td>
					</tr>
					<tr>
						<td> Price: </td>
						<td> {{i.item.price}} </td>
					</tr>
					<tr>
						<td> Restaurant: </td>
						<td> {{i.item.restaurantName}} </td>
					</tr>
					<tr>
						<td> Count: </td>
						<td> {{i.count}} </td>
					</tr>
					<tr>
						<td> Total: </td>
						<td> {{i.total}} </td>
					</tr>
				</table>
			</li>
		</ul>
		<button @click="createOrders"> Order </button>
		<button @click="goBack"> Continue shopping </button>
	</div>
	`,
	methods: {
		createOrders : function () {
			axios
			.post('rest/orders/create')
		},
		goBack : function () {
			let data = this.restaurant;
      		this.$router.push({
        		name: "viewRestaurant",
       			params: { data }
      		});
		}
	},
	mounted () {
		this.restaurant = this.$route.params.data;
		axios
		.get('rest/shoppingCart/getJustSc')
		.then(response => (this.sc = response.data));
	}
});