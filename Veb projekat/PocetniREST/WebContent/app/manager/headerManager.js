Vue.component("header-manager", {
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
					<router-link class="nav-link" to="/profile" exact> Profile </router-link>
				</li>
				<li>
					<router-link class="nav-link" to="/restaurantmanager" exact> My restaurant </router-link> 
				</li>
				<li>
					<router-link class="nav-link" to="/allrestaurantsmanager" exact> Restaurants </router-link>
				</li>
				<li>
					<router-link class="nav-link" to="/orders" exact> Orders </router-link>
				</li>
				<li>
					<a href="#" class="nav-link" v-on:click="logout"> Log out </a>
				</li>
			</ul>
		</div>
		</nav>
	</div>
	`,
	methods: {
		
        logout: function(event){
            event.preventDefault
            axios
            .get('rest/users/logout')
            .then(response => {
                location.href = "http://localhost:8080/PocetniREST";
            })
            .catch(err => {
                console.log(err);
                alert('Error during log out');
            })
        }
    }
	
});