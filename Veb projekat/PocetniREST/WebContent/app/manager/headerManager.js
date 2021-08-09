Vue.component("header-manager", {
	template:`
	<div>
		<nav>
			<ul>
				<li><router-link to="/" exact> Profile </router-link></li>
				<li> <router-link to="/restaurantmanager" exact> My restaurant </router-link> </li>
			</ul>
		</nav>
	</div>
	`
	
});