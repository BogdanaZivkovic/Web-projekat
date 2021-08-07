const ProfileDeliverer = {template:'<edit-user></edit-user>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', component: ProfileDeliverer}
	]
});

var appDeliverer = new Vue({
	router,
	el: '#deliverer'
})