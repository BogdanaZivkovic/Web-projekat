const ProfileCustomer = {template:'<edit-user></edit-user>'}
const RestaurantsCustomer = {template:'<all-restaurants-app></all-restaurants-app>'}
const ViewRestaurantCustomer = {template:'<view-restaurant-customer></view-restaurant-customer>'}
const ShoppingCart = {template:'<shopping-cart></shopping-cart>'}
const EditShoppingCart = {template:'<edit-shopping-cart></edit-shopping-cart>'}
const OrdersCustomer = {template:'<orders-customer></orders-customer>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileCustomer},
		{path: '/restaurants', component: RestaurantsCustomer},
		{path: '/restaurant', name: 'viewRestaurant',component: ViewRestaurantCustomer},
		{path: '/sc', name:'shoppingCart', component: ShoppingCart},
		{path: '/editSc', name: 'editShoppingCart', component: EditShoppingCart},
		{path: '/orders', component: OrdersCustomer}
	]
});

var appCustomer = new Vue({
	router,
	el: '#customer'
})