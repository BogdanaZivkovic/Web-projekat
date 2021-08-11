Vue.component("header-manager", {
	template:`
	<div>
		<nav>
			<ul>
				<li><router-link to="/" exact> Profile </router-link></li>
				<li> <router-link to="/restaurantmanager" exact> My restaurant </router-link> </li>
				<li> <router-link to="/allrestaurantsmanager" exact> Restaurants </router-link> </li>
				<li><button @click="logout" > Log out </button></li>
			</ul>
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