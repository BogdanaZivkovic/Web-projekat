Vue.component("login-app", {
	data: function () {
		return {
			newUser: {}
		}
	},
	template: `
    <div>
        <form id='login-form' @submit="login(newUser)" method='post'>
            <input type="text" v-model="newUser.userName" placeholder="Username" required>
			<br><br>
            <input type="password" v-model="newUser.password" placeholder="Password" required>
			<br><br>
            <button type='submit'> LOGIN </button>
        </form>
		<p>
			<a href="#/register">Register</a>
		</p>
    </div>
    `,
	methods: {
		login : function (newUser) {
			axios
			.post('rest/users/login', {
				"userName":''+newUser.userName, 
				"password":''+newUser.password
			})
			.then(response => (toast('User' + newUser.userName + "logged in.")))
		}
	},
	mounted () {
		axios
			.get('rest/users/getNewUser')
			.then(response => (this.newUser = response.data))
	},
});