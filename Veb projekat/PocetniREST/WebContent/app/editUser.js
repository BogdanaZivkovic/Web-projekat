Vue.component("edit-user", {
	data: function() {
		return {
			user: {}
		}
	},
	template:`
    <div>
		<div class="container-fluid bg-profile">
			<div class="row justify-content-center">
				<div class="col-12 col-sm-6 col-md-3">
					<div class="container">
				        <form @submit="updateUser(user)" class="form-container" method='post'>
						<div class="mb-3">
						<label style="font-size:24px;"> Welcome &nbsp</label>
						<label style="color:rgba(58, 112, 27);font-size:24px;"><b>{{user.userName}}</b> </label>
						</div>
						<div class="mb-3">
							<label class="form-label"> Current password: </label>
							<input type="text" v-model="user.password" class="form-control" placeholder="Password">
						</div>
						<div class="mb-3">
							<label class="form-label"> Name: </label>
							<input type="text" v-model="user.name" class="form-control"  placeholder="Name">
						</div>
						<div class="mb-3">
							<label class="form-label"> Surname: </label>
							<input type="text" v-model="user.surname" class="form-control"  placeholder="Surname">
						</div>
						<div class="mb-3">
							<label class="form-label">Gender:</label>
							<select  class="form-select" v-model="user.gender">
						    <option disabled value="">Please select one</option>
						    <option>Male</option>
						    <option>Female</option>
							</select>
						</div>
						<div class="mb-3">
							<label class="form-label">Date of birth:</label>
							<input type="date" class="form-control" v-model="user.dateOfBirth" min="1950-01-01" max="2020-01-01">		
							<br><br>
						<div class="d-grid gap-2 col-6 mx-auto">
							<button class="btn btn-primary" type='submit'> Update </button> 
						</form>
					</div>
				<div>
			</div>
		</div>
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