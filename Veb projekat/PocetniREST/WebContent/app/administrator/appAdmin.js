const ProfileAdmin = {template:'<profile-admin></profile-admin>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileAdmin}
	]
});

var appAdmin = new Vue({
	router,
	el: '#administrator'
})