const ProfileDeliverer = {template:'<edit-user></edit-user>'}
const OrdersDeliverer = {template:'<orders-deliverer></orders-deliverer>'}
const MyOrders = {template:'<my-orders-deliverer></my-orders-deliverer>'}
const RestaurantsDeliverer = {template:'<all-restaurants-app></all-restaurants-app>'}
const ViewRestaurantDeliverer = {template:'<view-restaurant></view-restaurant>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: RestaurantsDeliverer},
		{ path: '/orders', component: OrdersDeliverer},
		{ path: '/myorders', component: MyOrders},
		{ path: '/profile', component: ProfileDeliverer},
		{ path: '/restaurants', component: RestaurantsDeliverer},
		{path: '/restaurant', name:'viewRestaurant', component: ViewRestaurantDeliverer},
	]
});

var appDeliverer = new Vue({
	router,
	el: '#deliverer'
})