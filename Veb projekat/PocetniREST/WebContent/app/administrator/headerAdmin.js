Vue.component("header-admin", {
	template:`
	<div>
		<nav>
			<ul>
				<li><router-link to="/" exact> Profile </router-link></li>
				<li> <router-link to="/usersadmin" exact> Users </router-link> </li>
				<li> <router-link to="/restaurantadmin" exact> New restaurant </router-link></li>
			</ul>
		</nav>
	</div>
	`
	
});