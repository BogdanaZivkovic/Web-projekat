Vue.component("header-app", {
	template:`
	<div>
		<nav>
			<ul>
				<li> <router-link to="/register" exact> Register </router-link> </li>
				<li><router-link to="/login" exact> Login </router-link></li>
			</ul>
		</nav>
	</div>
	`
	
});