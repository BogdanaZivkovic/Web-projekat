const Login = {template: '<login-app></login-app>'}
const Register = {template: '<register-app></register-app>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Login},
		{ path: '/login', component: Login},
		{ path: '/register', component: Register}
	  ]
});

var app = new Vue({
	router,
	el: '#foodDelivery'
});