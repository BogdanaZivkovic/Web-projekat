const Register = {template: '<register></register>'}

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