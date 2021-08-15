Vue.component("users-admin", {
	data: function() {
		return {
			searchFields: {
				name: '',
				surname: '',
				userName: ''
			},
			filters: {
				role:''
			},
			users: [],
			searchVisible: false,
			sortVisible: false,
			filterVisible: false
		}
	},
	template: `
	<div>
		<button @click="$router.push('/adduseradmin')"> ADD </button>
		<br><br>
		<button @click="searchVisible=!searchVisible">Search</button>
		<button @click="sortVisible=!sortVisible">Sort</button>
		<button @click="filterVisible=!filterVisible">Filter</button>
		<br><br>
		<div v-if="searchVisible">
			<form method='post'>
				<input type="text" v-model="searchFields.name" placeholder="User name"></input>
				<br><br>
				<input type="text" v-model="searchFields.surname" placeholder="User surname"></input>
				<br><br>
				<input type="text" v-model="searchFields.userName" placeholder="User username"></input>
				<br><br>
			</form>
		</div>
		<div v-if="sortVisible">
			<button @click="sortNameAsc"> Name ascending </button>
			<button @click="sortNameDesc"> Name descending </button>
			<br><br>
			<button @click="sortSurnameAsc"> Surname ascending </button>
			<button @click="sortSurnameDesc"> Surname descending </button>
			<br><br>
			<button @click="sortUserNameAsc"> Username ascending </button>
			<button @click="sortUserNameDesc"> Username descending </button>
			<br><br>
		</div>
		<div v-if="filterVisible">
			<form method='post'>
				<select v-model="filters.role">
		    		<option disabled value="">Please select one</option>
					<option value="">All</option>
		    		<option>CUSTOMER</option>
					<option>MANAGER</option>
					<option>DELIVERER</option>
					<option>ADMINISTRATOR</option>
				</select>
			</form>
		</div>
		<table>
			<tr>
				<th> Usermame </th>
				<th> Password </th>
				<th> Name </th>
				<th> Surname </th>
				<th> Gender </th>
				<th> Date of birth </th>
				<th> Role </th>
				<th> Delete </th>
			</tr>
			<tr v-for="user in filteredUsers">
				<td> {{user.userName}} </td>
				<td> {{user.password}} </td>
				<td> {{user.name}} </td>
				<td> {{ user.surname }} </td>
				<td> {{ user.gender }} </td>
				<td> {{user.dateOfBirth}} </td>
				<td> {{ user.role }} </td>
				<td> <button @click="deleteUser(user)"> Delete </button> </td>
			</tr>
		</table>
	</div>
	`,
	methods: {
		matchesSearch: function (user) {
			if(!user.name.toLowerCase().match(this.searchFields.name.toLowerCase()))
				return false;
			if(!user.surname.toLowerCase().match(this.searchFields.surname.toLowerCase()))
				return false;
			if(!user.userName.toLowerCase().match(this.searchFields.userName.toLowerCase()))
				return false;
			if(!user.role.toLowerCase().match(this.filters.role.toLowerCase()))
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
          	.get('rest/users/getAllUsers')
          	.then(response => (this.users = response.data))
    	},
		deleteUser : function (user) {
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/users/delete', {
					"userName":''+user.userName
				})
				.then(response => (this.init()))
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