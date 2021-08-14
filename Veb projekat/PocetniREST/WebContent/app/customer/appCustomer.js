const ProfileCustomer = {template:'<edit-user></edit-user>'}
const RestaurantsCustomer = {template:'<all-restaurants-app></all-restaurants-app>'}
const ViewRestaurantCustomer = {template:'<view-restaurant-customer></view-restaurant-customer>'}
const SelectItem = {template:'<select-item-customer></select-item-customer>'}
const ShoppingCart = {template:'<shopping-cart></shopping-cart>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileCustomer},
		{path: '/restaurants', component: RestaurantsCustomer},
		{path: '/restaurant', name: 'viewRestaurant',component: ViewRestaurantCustomer},
		{path: '/item', name: 'selectItem', component: SelectItem},
		{path: '/sc', component: ShoppingCart}
	]
});

var appCustomer = new Vue({
	router,
	el: '#customer'
})