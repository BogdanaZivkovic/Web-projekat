const ProfileManager = {template:'<edit-user></edit-user>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileManager}
	]
});

var appManager = new Vue({
	router,
	el: '#manager'
})