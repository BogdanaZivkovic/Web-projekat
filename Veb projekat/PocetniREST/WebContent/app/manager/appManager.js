const ProfileManager = {template:'<edit-user></edit-user>'}
const ViewRestaurantManager = {template:'<view-restaurant-manager></view-restaurant-manager>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileManager},
		{path: '/restaurantManager', component: ViewRestaurantManager}
	]
});

var appManager = new Vue({
	router,
	el: '#manager'
})