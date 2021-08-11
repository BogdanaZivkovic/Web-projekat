const ProfileManager = {template:'<edit-user></edit-user>'}
const ViewRestaurantManager = {template:'<view-restaurant-manager></view-restaurant-manager>'}
const RestaurantsManager = {template:'<all-restaurants-app></all-restaurants-app>'}
const AddItemManager = {template:'<add-item-manager></add-item-manager>'}
const EditItemManager = {template:'<edit-item-manager></edit-item-manager>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileManager},
		{path: '/restaurantmanager', component: ViewRestaurantManager},
		{path: '/allrestaurantsmanager', component: RestaurantsManager},
		{path: '/additem', name:'addItem', component: AddItemManager},
		{path: '/edititem', name:'editItem', component: EditItemManager}
	]
});

var appManager = new Vue({
	router,
	el: '#manager'
})