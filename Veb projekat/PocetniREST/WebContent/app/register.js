Vue.component("register-app", {
	data: function() {
		return {
			newUser: {
				userName: "",
				password: "",
				name: "",
				surname: "",
				gender: "",
				dateOfBirth: ""
			}
		}
	},
	template: `
	<div class="container-fluid bg-7">
        <div class="row justify-content-center">
			<div class="col-12 col-sm-6 col-md-3">
				<form class="form-container" @submit="register(newUser)" method='post'>
				  <div class="mb-3">
				    <label for="usernameInput" class="form-label">Username</label>
				    <input id="usernameInput" type="text" v-model="newUser.userName" class="form-control" placeholder="Username" required>
				  </div>
					<div class="mb-3">
				    <label for="nameInput" class="form-label">Name</label>
				    <input id="nameInput" type="text" v-model="newUser.name" class="form-control" placeholder="Name">
				  </div>
					<div class="mb-3">
				    <label for="surnameInput" class="form-label">Username</label>
				    <input id="surnameInput" type="text" v-model="newUser.surname" class="form-control" placeholder="Surname">
				  </div>
				  <div class="mb-3">
				    <label for="passwordInput" class="form-label">Password</label>
				    <input id="passwordInput" type="password" v-model="newUser.password" class="form-control" placeholder="Password" required>
				  </div>
					<div class="mb-3">
				   		<label for="genderInput" class="form-label">Gender</label>
				    	<select id="genderInput" v-model="newUser.gender" class="form-select">
							<option disabled value="">Please select one</option>
						    <option>Male</option>
						    <option>Female</option>
						</select>
				  	</div>
					<div class="mb-3">
				    	<label for="dateInput" class="form-label">Date of birth</label>
				    	<input id="dateInput" type="date" v-model="newUser.dateOfBirth" class="form-control" placeholder="Date of birth">
				 	 </div>
					<div class="d-grid gap-2 col-6 mx-auto">
					  <button type="submit" class="btn btn-primary"> Register </button>
					</div>
				</form>
			</div>
		</div>
    </div>
    `,
	methods: {
		register : function (newUser) {
			event.preventDefault();
			axios
			.post('rest/users/registration', {
				"userName":''+newUser.userName, 
				"password":''+newUser.password, 
				"name":''+newUser.name, 
				"surname":''+newUser.surname, 
				"gender":''+newUser.gender, 
				"dateOfBirth":''+newUser.dateOfBirth, 
				"role":"CUSTOMER"
			})
			.then(response => {
				router.push('login');
				toast("User " + newUser.userName + " successfully registered.");
			})
			.catch(function (error) {
			    if (error.response) {
			    	toast("User " + newUser.userName + " already exists.");
			    }
			});
		}
	},
});