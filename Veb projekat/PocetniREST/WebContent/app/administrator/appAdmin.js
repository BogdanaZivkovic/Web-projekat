const ProfileAdmin = {template:'<edit-user></edit-user>'}
const UsersAdmin = {template:'<users-admin></users-admin>'}
const RestaurantsAdmin = {template:'<restaurants-admin></restaurants-admin>'}
const RestaurantAdmin = {template:'<restaurant-admin></restaurant-admin>'}
const AddUserAdmin = {template:'<add-user-admin></add-user-admin>'}
const ViewRestaurantAdmin = {template:'<view-restaurant></view-restaurant>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileAdmin},
		{path: '/usersadmin', component: UsersAdmin},
		{path: '/restaurantadmin', component: RestaurantAdmin},
		{path: '/restaurantsadmin', component: RestaurantsAdmin},
		{path: '/adduseradmin', component: AddUserAdmin},
		{path: '/viewrestaurant', name:'viewRestaurant', component: ViewRestaurantAdmin}
	]
});

var appAdmin = new Vue({
	router,
	el: '#administrator'
})