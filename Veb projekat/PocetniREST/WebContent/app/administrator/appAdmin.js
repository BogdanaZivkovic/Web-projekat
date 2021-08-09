const ProfileAdmin = {template:'<edit-user></edit-user>'}
const UsersAdmin = {template:'<users-admin></users-admin>'}
const RestaurantsAdmin = {template:'<restaurants-admin></restaurants-admin>'}
const RestaurantAdmin = {template:'<restaurant-admin></restaurant-admin>'}
const AddUserAdmin = {template:'<add-user-admin></add-user-admin>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileAdmin},
		{path: '/usersadmin', component: UsersAdmin},
		{path: '/restaurantadmin', component: RestaurantAdmin},
		{path: '/restaurantsadmin', component: RestaurantsAdmin},
		{path: '/adduseradmin', component: AddUserAdmin}
	]
});

var appAdmin = new Vue({
	router,
	el: '#administrator'
})