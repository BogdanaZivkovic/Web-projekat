const ProfileAdmin = {template:'<edit-user></edit-user>'}

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