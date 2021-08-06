const ProfileCustomer = {template:'<edit-user></edit-user>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileCustomer}
	]
});

var appCustomer = new Vue({
	router,
	el: '#customer'
})