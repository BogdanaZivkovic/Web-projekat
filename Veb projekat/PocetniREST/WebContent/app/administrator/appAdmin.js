const ProfileAdmin = {template:'<edit-user></edit-user>'}
const UsersAdmin = {template:'<users-admin></users-admin>'}
const RestaurantAdmin = {template:'<restaurant-admin></restaurant-admin>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileAdmin},
		{path: '/usersadmin', component: UsersAdmin},
		{path: '/restaurantadmin', component: RestaurantAdmin}
	]
});

var appAdmin = new Vue({
	router,
	el: '#administrator'
})