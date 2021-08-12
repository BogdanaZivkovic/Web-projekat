Vue.component("users-admin", {
	data: function() {
		return {
			users: []
		}
	},
	template: `
	<div>
		<button @click="$router.push('/adduseradmin')"> ADD </button>
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
			<tr v-for="user in users">
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
});