const ProfileDeliverer = {template:'<edit-user></edit-user>'}
const OrdersDeliverer = {template:'<orders-deliverer></orders-deliverer>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileDeliverer},
		{ path: '/orders', component: OrdersDeliverer}
	]
});

var appDeliverer = new Vue({
	router,
	el: '#deliverer'
})