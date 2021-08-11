Vue.component("edit-user", {
	data: function() {
		return {
			user: {}
		}
	},
	template:`
    <div>
        <form @submit="updateUser(user)" method='post'>
			<label> {{user.userName}} </label>
			<br></br>
			<input type="text" v-model="user.password" placeholder="Password">
			<br></br>
			<input type="text" v-model="user.name" placeholder="Password">
			<br></br>
			<input type="text" v-model="user.surname" placeholder="Password">
			<br></br>
			<label>Gender:</label>
			<select v-model="user.gender">
		    <option disabled value="">Please select one</option>
		    <option>Male</option>
		    <option>Female</option>
			</select>
			<br><br>
			<label>Date of birth:</label>
			<input type="date" v-model="user.dateOfBirth" min="1950-01-01" max="2020-01-01">		
			<br><br>
			<button type='submit'> UPDATE </button> 
		</form>
    </div>
    `,
	methods: {
		updateUser : function (user) {
			axios
			.post('rest/profile/update', {
				"userName":''+user.userName, 
				"password":''+user.password, 
				"name":''+user.name, 
				"surname":''+user.surname, 
				"gender":''+user.gender, 
				"dateOfBirth":''+user.dateOfBirth, 
				"role":''+user.role
			})
			.then(response => (this.init()))
		}		
	},
	mounted() {
		axios
			.get('rest/profile/getUser')
			.then(response => this.user = response.data)
	}
});