Vue.component("users-admin", {
	data: function() {
		return {
			searchFields: {
				name: '',
				surname: '',
				userName: ''
			},
			filters: {
				role:'',
				customerType:''
			},
			users: [],
			newUser: {
				userName: "",
				password: "",
				name: "",
				surname: "",
				gender: "",
				dateOfBirth: "",
				role:""
			}
		}
	},
	template: `
	<div>
		<div class="container-fluid bg">
			<div class="row justify-content-center" >
				<div class="col-lg-6 col-md-6 col-sm-12 search-area ">
					<div class="container">
						<div class="row justify-content-between">
							<div class="col-lg-10 col-md-10 col-sm-10">
							<p>
							<button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSearch" aria-expanded="false" aria-controls="collapseSearch">
	    					Search
	  						</button>
							</p>
							<div class="collapse" id="collapseSearch">
								<div class="card card-colored">
									<div class="row ms-1">
									<input class="input-style" style="width: 160px;" type="text" v-model="searchFields.name" placeholder="Name">
									<input class="input-style" style="width: 160px;" type="text" v-model="searchFields.surname" placeholder="Surname">
									<input class="input-style" style="width: 160px;" type="text" v-model="searchFields.userName" placeholder="Username">
									</div>
								</div>
							</div>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-2"> 		
								<div class="dropdown">
									<button class="btn dropdown-toggle float-right" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									    Sort
									</button>
									<ul class="dropdown-menu dropdown-list" >
									    <li><a class="dropdown-item" href="#" v-on:click="sortNameAsc">Name ascending</a></li>
									    <li><a class="dropdown-item" href="#" v-on:click="sortNameDesc">Name descending </a></li>
									    <li><a class="dropdown-item" href="#" v-on:click="sortSurnameAsc">Surname ascending</a></li>
					 					<li><a class="dropdown-item" href="#" v-on:click="sortSurnameDesc">Surname descending</a></li>
									 	<li><a class="dropdown-item" href="#" v-on:click="sortUserNameAsc">Username ascending</a></li>
					 					<li><a class="dropdown-item" href="#" v-on:click="sortUserNameDesc">Username descending</a></li>
										<li><a class="dropdown-item" href="#" v-on:click="sortPointsAsc">Points ascending</a></li>
					 					<li><a class="dropdown-item" href="#" v-on:click="sortPointsDesc">Points descending</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="row">
							<p>
							<button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
	    					Filters
	  						</button>
							</p>
						<div class="collapse" id="collapseExample">
							<div class="card card-colored">
								<div class="row ms-1">
									<div class="col-lg-6 col-md-6 col-sm-6">
										<label> User role: </label>
										<select style="margin: 5px;" class="selectpicker select-nice" v-model="filters.role">
										    <option disabled value="">Please select one</option>
											<option value="">All</option>
										    <option>CUSTOMER</option>
											<option>MANAGER</option>
											<option>DELIVERER</option>
											<option>ADMINISTRATOR</option>			
										</select>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6">
										<label> Customer type: </label>
										<select style="margin: 5px;" class="selectpicker select-nice" v-model="filters.customerType">
										    <option disabled value="">Please select one</option>
											<option value="">All</option>
										    <option>BRONZE</option>
											<option>SILVER</option>
											<option>GOLD</option>
											<option>UNDEFINED</option>			
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		</div>
		<div class="row justify-content-center mb-2">
			<div class="col-lg-9 col-md-10 col-sm-12">
				<div class="row float-end me-2">
					<button class="btn btn-primary" @click="clearNewUser" data-bs-toggle="modal" data-bs-target="#newUser"> &plus; New user </button>
				</div>
			</div>
		</div>
		<div class="row justify-content-center mb-2">
			<div class="col-lg-9 col-md-10 col-sm-12">
				<table class="table-style mb-5">
				<colgroup>
					    <col class="ten" />
					    <col class="ten" />
					    <col class="ten" />
					    <col class="ten" />
						<col class="ten" />
					    <col class="fifteen" />
					    <col class="ten" />
					    <col class="ten" />
						<col class="five" />
					    <col class="ten" />
					  	</colgroup>
					<tr>
						<th> Usermame </th>
						<th> Password </th>
						<th> Name </th>
						<th> Surname </th>
						<th> Gender </th>
						<th> Date of birth </th>
						<th> Role </th>
						<th> Blocked </th>
						<th>       </th>
						<th>       </th>
					</tr>
					<tr v-for="user in filteredUsers">
						<td class="td-style"> {{user.userName}} </td>
						<td class="td-style"> {{user.password}} </td>
						<td class="td-style"> {{user.name}} </td>
						<td class="td-style"> {{ user.surname }} </td>
						<td class="td-style"> {{ user.gender }} </td>
						<td class="td-style"> {{user.dateOfBirth}} </td>
						<td class="td-style"> {{ user.role }} </td>
						<td class="td-style"> {{ user.isBlocked }} </td>
						<td class="td-style" v-if = "!user.role.match('ADMINISTRATOR')"> 	
							<button class="btn btn-outline-danger" @click="deleteUser(user)"> 
							<i class="bi bi-trash"></i>
							</button> 
						</td>
						<div v-if = "!user.role.match('ADMINISTRATOR')">
						
						<td class="td-style" v-if = "!user.isBlocked"> <button class="btn btn-dark" @click="blockUser(user)"> Block </button> </td>
						<td class="td-style" v-else> <button class="btn btn-dark" @click="unblockUser(user)"> Unblock </button> </td>
						</div>
					</tr>
				</table>
			</div>
		</div>
	</div>
	
			<div class="modal fade" id="newUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newUserLabel" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="newUserLabel">New user</h5>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
				  <form @submit="register(newUser)" method='post'>
				      <div class="modal-body">
						  	<div class="mb-3">
						    <label for="nameInput" class="form-label">Name</label>
						    <input v-model="newUser.name" id="nameInput" type="text" class="form-control" placeholder="Name" required>
							</div>
						  	<div class="mb-3">
						    <label for="surnameInput" class="form-label"> Surname </label>
						    <input v-model="newUser.surname" id="surnameInput" type="text" class="form-control" placeholder="Surname" required>
						  	</div>
						  	<div class="mb-3">
						    <label for="usernameInput" class="form-label"> Username </label>
						    <input v-model="newUser.userName" id="usernameInput" type="text" class="form-control" placeholder="Username" required>
						  	</div>
							<div class="mb-3">
						    <label for="passwordInput" class="form-label"> Password </label>
						    <input v-model="newUser.password" id="passwordInput" type="text" class="form-control" placeholder="Password" required>
						  	</div>
						  	<div class="mb-3">
					   		<label for="genderInput" class="form-label"> Gender </label>
					    	<select v-model="newUser.gender" id="genderInput" class="form-select">
								<option disabled value="">Please select one</option>
							    <option>Male</option>
							    <option>Female</option>
							</select>
					  	 	</div>
						  <div class="mb-3">
						    <label for="dateOfBirthInput" class="form-label"> Date of birth </label>
							<input type="date" v-model="newUser.dateOfBirth" min="1950-01-01" max="2020-01-01" id="dateOfBirthInput" class="form-control">
						  </div>
						  <div class="mb-3">
						    <label for="roleInput" class="form-label"> Role </label>
						    <select v-model="newUser.role" id="roleInput" class="form-select">
								<option disabled value="">Please select one</option>
							    <option>CUSTOMER</option>
		   						<option>MANAGER</option>
								<option>DELIVERER</option>
							</select>
						  </div>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
				        <button type='submit' class="btn btn-primary"> Confirm </button>
				      </div>
				</form>
				</div>
			</div>
		</div>
	</div>
	`,
	methods: {
		clearNewUser: function() {
			this.newUser = {
				name: "",
				price: "",
				type: "",
				restaurantName: "",
				quantity: "",
				description: "",
				logoPath: "",
			};
		},
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
				"role":''+newUser.role
			})
			.then(response => {
				$('#newUser').modal('hide');
				this.init();
				toast("User " + newUser.userName + " successfully registered.");
			})
			.catch(function (error) {
			    if (error.response) {
			    	toast("User " + newUser.userName + " already exists.");
			    }
			});
		},
		
		matchesSearch: function (user) {
			if(!user.name.toLowerCase().match(this.searchFields.name.toLowerCase()))
				return false;
			if(!user.surname.toLowerCase().match(this.searchFields.surname.toLowerCase()))
				return false;
			if(!user.userName.toLowerCase().match(this.searchFields.userName.toLowerCase()))
				return false;
			if(!user.role.toLowerCase().match(this.filters.role.toLowerCase()))
				return false;
			if(!user.customerType.typeName.toLowerCase().match(this.filters.customerType.toLowerCase()))
				return false;
			return true;
		},
		sortNameAsc: function () {
			this.users.sort((a, b) => {return this.alphaNumCriterium(a.name, b.name)});
		},
		sortNameDesc: function () {
			this.users.sort((a, b) => {return this.alphaNumCriterium(b.name, a.name)});
		},
		sortSurnameAsc: function() {
			this.users.sort((a, b) => {return this.alphaNumCriterium(a.surname, b.surname)});
		},
		sortSurnameDesc: function() {
			this.users.sort((a, b) => {return this.alphaNumCriterium(b.surname, a.surname)});
		},
		sortUserNameAsc: function () {
			this.users.sort((a, b) => {return this.alphaNumCriterium(a.userName, b.userName)});
		},
		sortUserNameDesc: function () {
			this.users.sort((a, b) => {return this.alphaNumCriterium(b.userName, a.userName)});
		},
		sortPointsAsc: function () {
			this.users.sort((a, b) => {return a.points - b.points});
		},
		sortPointsDesc: function () {
			this.users.sort((a, b) => {return b.points - a.points});
		},
		alphaNumCriterium: function (a,b) {
      		var reA = /[^a-zA-Z]/g;
      		var reN = /[^0-9]/g;
      		var aA = a.replace(reA, "");
      		var bA = b.replace(reA, "");
      		if(aA === bA) {
          		var aN = parseInt(a.replace(reN, ""), 10);
          		var bN = parseInt(b.replace(reN, ""), 10);
          		return aN === bN ? 0 : aN > bN ? 1 : -1;
      		} else {
          		return aA > bA ? 1 : -1;
      		}
    	},	
		init : function() {
			axios
          	.get('rest/users/getAllUsers')
          	.then(response => (this.users = response.data))
    	},
		deleteUser : function (user) {
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/users/delete', {
					"userName":''+user.userName
				})
				.then(response => {
					this.init();
					toast("User " + user.userName + " deleted.");
				});
			}
		},
		blockUser : function (user) {
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/users/block', {
					"userName":''+user.userName
				})
				.then(response => {
					this.init();
					toast("User " + user.userName + " blocked.");
				});
			}
		},
		unblockUser : function (user) {
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/users/unblock', {
					"userName":''+user.userName
				})
				.then(response => {
					this.init();
					toast("User " + user.userName + " unblocked.");
				});
			}
		}
	},
	mounted () {
		this.init();
	},
	computed: {
		filteredUsers: function() {
			return this.users.filter((user) => {
				return this.matchesSearch(user);
			});
		}
	},
});