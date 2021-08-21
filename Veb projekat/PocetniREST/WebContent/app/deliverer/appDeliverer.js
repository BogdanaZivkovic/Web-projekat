const ProfileDeliverer = {template:'<edit-user></edit-user>'}
const OrdersDeliverer = {template:'<orders-deliverer></orders-deliverer>'}
const MyOrders = {template:'<my-orders-deliverer></my-orders-deliverer>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileDeliverer},
		{ path: '/orders', component: OrdersDeliverer},
		{ path: '/myorders', component: MyOrders}
	]
});

var appDeliverer = new Vue({
	router,
	el: '#deliverer'
})