const Login = {template: '<login-app></login-app>'}
const Register = {template: '<register-app></register-app>'}
const AllRestaurants = {template: '<all-restaurants-app></all-restaurants-app>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: Login},
		{ path: '/login', component: Login},
		{ path: '/register', component: Register},
		{ path: '/restaurants', component: AllRestaurants}
	  ]
});

var app = new Vue({
	router,
	el: '#foodDelivery'
});