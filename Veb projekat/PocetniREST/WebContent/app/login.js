Vue.component("login-app", {
	data: function () {
		return {
			newUser: {
				userName: "",
				password: ""
			}
		}
	},
	template: `
    <div class="container-fluid bg">
        <div class="row justify-content-center">
			<div class="col-12 col-sm-6 col-md-3">
				<form class="form-container" @submit="login(newUser)" method='post'>
				  <div class="mb-3">
				    <label for="usernameInput" class="form-label">Username</label>
				    <input id="usernameInput" type="text" v-model="newUser.userName" class="form-control" placeholder="Username" required>
				  </div>
				  <div class="mb-3">
				    <label for="passwordInput" class="form-label">Password</label>
				    <input id="passwordInput" type="password" v-model="newUser.password" class="form-control" placeholder="Password" required>
				  </div>
					<div class="d-grid gap-2 col-6 mx-auto">
					  <button type="submit" class="btn btn-primary"> Login </button>
					</div>
				</form>
			</div>
		</div>
    </div>
    `,
	methods: {
		login : function (newUser) {
			event.preventDefault();
			axios
			.post('rest/users/login', {
				"userName":''+newUser.userName, 
				"password":''+newUser.password
			})
			.then(response => {
				location.href = response.data;
			})
			.catch(function (error) {
			    if (error.response) {
			    	toast("Invalid username/password!");
			    }
			});
		}
	},
});