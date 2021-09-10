Vue.component("restaurant-customers", {
	data: function() {
		return {
			searchFields: {
				name: '',
				surname: '',
				userName: ''
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
									</ul>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
			<div class="row justify-content-center mb-2">
				<div class="col-lg-9 col-md-10 col-sm-12">
					<table class="table-style mb-5">
						<tr>
							<th> Usermame </th>
							<th> Password </th>
							<th> Name </th>
							<th> Surname </th>
							<th> Gender </th>
							<th> Date of birth </th>
							<th> Role </th>
							<th> Blocked </th>
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
						</tr>
					</table>
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
		matchesSearch: function (user) {
			if(!user.name.toLowerCase().match(this.searchFields.name.toLowerCase()))
				return false;
			if(!user.surname.toLowerCase().match(this.searchFields.surname.toLowerCase()))
				return false;
			if(!user.userName.toLowerCase().match(this.searchFields.userName.toLowerCase()))
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
          	.get('rest/orders/getMyCustomers')
          	.then(response => (this.users = response.data))
    	},	
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