Vue.component("header-app", {
	template:`
	<div class="container">
		<nav class="navbar navbar-expand-md navbar-light">
		<a href="#" v-on:click="$router.push('/')" class="navbar-brand"> 
			<img src="images/logo.png" alt="FDLogo" width="90" height="60" class="d-inline-block align-top"/> 
			<span class="hidden"> FD </span> 
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#toggleMobileMenu"
			aria-controls="toggleMobileMenu"
			aria-expanded="false"
			aria-lable="Toggle navigation"
			>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="toggleMobileMenu">
			<ul class="navbar-nav text-center">
				<li>
				<router-link class="nav-link" to="/register" exact> Register </router-link> 
				</li>
				<li>
				<router-link class="nav-link" to="/login" exact> Login </router-link>
				</li>
				<li>
				<router-link class="nav-link" to="/restaurants" exact> Restaurants </router-link>
				</li>
			</ul>
		</div>
		</nav>
	</div>
	`
});