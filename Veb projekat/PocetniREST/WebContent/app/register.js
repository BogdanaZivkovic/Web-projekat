Vue.component("register-app", {
	data: function() {
		return {
			newUser: {}
		}
	},
	template: `
    <div>
        <form id='register-form' @submit="register(newUser)" method='post'>
            <input type="text" v-model="newUser.userName" placeholder="Username" required>
			<br><br>
            <input type="text" v-model="newUser.name" placeholder="Name">
			<br><br>
            <input type="text" v-model="newUser.surname" placeholder="Surname">
			<br><br>
            <input type="password" v-model="newUser.password" placeholder="Password" required>
			<br><br>
            <button type='submit'> REGISTER </button>
        </form>
    </div>
    `,
	methods: {
		register : function (newUser) {
			axios
			.post('rest/users/registration', {
				"userName":''+newUser.userName, 
				"password":''+newUser.password, 
				"name":''+newUser.name, 
				"surname":''+newUser.surname, 
				"gender":"MALE", 
				"dateOfBirth":"Unknown", 
				"role":"GUEST"
			})
			.then(response => (toast('User' + newUser.userName + "registered.")))
		}
	},
	mounted () {
		axios
			.get('rest/users/getNewUser')
			.then(response => (this.newUser = response.data))
	},
});