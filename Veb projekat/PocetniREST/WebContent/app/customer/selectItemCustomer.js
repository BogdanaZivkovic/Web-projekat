Vue.component("select-item-customer", {
	data: function() {
		return {
			item: {},
			count:1
		}
	},
	template:`
	<div>
		<table>
				<tr>
					<td> ID: </td>
					<td> {{item.itemID}} </td>
				</tr>
				<tr>
					<td> Name: </td>
					<td> {{item.name}} </td>
				</tr>
				<tr>
					<td> Price: </td>
					<td> {{item.price}} </td>
				</tr>
				<tr>
					<td> Restaurant: </td>
					<td> {{item.restaurantName}} </td>
				</tr>
				<tr>
					<td> Quantity: </td>
					<td> {{item.quantity}} </td>
				</tr>
				<tr>
					<td> Description: </td>
					<td> {{item.description}} </td>
				</tr>
			</table>
			<input type="number" v-model="count" placeHolder="Count" min="1">
			<button @click="addToShoppingCart""> Add </button>
	</div>
	`,
	methods: {
		addToShoppingCart : function () {
			axios
			.post('rest/shoppingCart/add', {
				item: this.item,
				"count":''+this.count
			})
			.then(router.go(-2))
		}
	},
	mounted () {
		this.item = this.$route.params.data;
	}
});