const ProfileManager = {template:'<edit-user></edit-user>'}
const ViewMyRestaurant = {template:'<view-restaurant-manager></view-restaurant-manager>'}
const RestaurantsManager = {template:'<all-restaurants-app></all-restaurants-app>'}
const AddItemManager = {template:'<add-item-manager></add-item-manager>'}
const EditItemManager = {template:'<edit-item-manager></edit-item-manager>'}
const ViewRestaurantManager = {template:'<view-restaurant></view-restaurant>'}
const OrdersManager = {template:'<orders-manager></orders-manager>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileManager},
		{path: '/restaurantmanager', component: ViewMyRestaurant},
		{path: '/allrestaurantsmanager', component: RestaurantsManager},
		{path: '/additem', name:'addItem', component: AddItemManager},
		{path: '/edititem', name:'editItem', component: EditItemManager},
		{path: '/restaurant', name:'viewRestaurant', component: ViewRestaurantManager},
		{path: '/orders', component: OrdersManager}
	]
});

var appManager = new Vue({
	router,
	el: '#manager'
})