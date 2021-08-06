Vue.component("users-admin", {
	data: function() {
		return {
			users: []
		}
	},
	template: `
	<div>
		<table>
			<tr>
				<th> Usermame </th>
				<th> Password </th>
				<th> Name </th>
				<th> Surname </th>
				<th> Gender </th>
				<th> Date of birth </th>
				<th> Role </th>
			</tr>
			<tr v-for="user in users">
				<td> {{user.userName}} </td>
				<td> {{user.password}} </td>
				<td> {{user.name}} </td>
				<td> {{ user.surname }} </td>
				<td> {{ user.gender }} </td>
				<td> {{user.dateOfBirth}} </td>
				<td> {{ user.role }} </td>
			</tr>
		</table>
	</div>
	`,
	mounted () {
		axios
          .get('rest/users/getAllUsers')
          .then(response => (this.users = response.data))
	},
});