const Register = {template: '<register-app></register-app>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Register},
	  ]
});

var app = new Vue({
	router,
	el: '#foodDelivery'
});