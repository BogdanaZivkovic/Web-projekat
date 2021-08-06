const ProfileAdmin = {template:'<edit-user></edit-user>'}
const UsersAdmin = {template:'<users-admin></users-admin>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileAdmin},
		{path: '/usersadmin', component: UsersAdmin}
	]
});

var appAdmin = new Vue({
	router,
	el: '#administrator'
})