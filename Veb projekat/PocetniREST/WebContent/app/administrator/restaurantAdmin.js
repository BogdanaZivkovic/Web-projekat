Vue.component("restaurant-admin", {
	data: function() {
		return {
			newRestaurant: {
				name: "",
				type: "",
				status: "",
				managerUsername: "",
				city:"",
				street:"",
				number:"",
				zipCode:"",
				logoPath: "",
				latitude: "",
				longitude: ""
			},
			newUser: {
				userName: "",
				password: "",
				name: "",
				surname: "",
				gender: "",
				dateOfBirth: ""
			},
			managers: []
		}
	},
	template: `
    <div>
		<div class="container-fluid bg-2">
			<div class="row justify-content-center">
				<div class="col-lg-6 col-md-8 col-sm-10">
        			<form @submit="createRestaurant(newRestaurant)" method='post' class="form-container">
	       				  <div class="mb-3">
						    <label for="nameInput" class="form-label">Restaurant name</label>
						    <input v-model="newRestaurant.name" id="nameInput" type="text" class="form-control" placeholder="Restaurant name" required>
						  </div>
						  <div class="mb-3">
					   		<label for="typeInput" class="form-label"> Type </label>
					    	<select v-model="newRestaurant.type" id="typeInput" class="form-select" required>
								<option disabled value="">Please select one</option>
							    <option>Chinese</option>
							    <option>Italian</option>
								<option>Fast food</option>
								<option>BBQ</option>
								<option>Mexican</option>
								<option>Gyros</option>
							</select>
					  	  </div>
						  <div class="mb-3">
						    <label for="imageInput" class="form-label">Image</label>
						    <input id="imageInput" type="file" class="form-control" onchange="encodeImageFileAsURLForChanging(this)" required>
							<img hidden id="imgForChangeID"  src="" alt="Image of restaurant" width="11" height="11">
						  </div>
						  <div class="mb-3">
						    <label for="managerInput" class="form-label"> Manager </label>
						    <select v-if="managers.length!=0" v-model="newRestaurant.managerUsername" id="managerInput" class="form-select" required>
								<option v-for="manager in managers" v-bind:value=manager.userName>
                       				{{ manager.name + " " + manager.surname}}
                   				</option>
							</select>
							<p v-else> There are no available managers. <a href="#" v-on:click="userModalOpening" data-bs-toggle="modal" data-bs-target="#userModal"> Register new manager. </a> </p>
						  </div>
						  <div hidden>
						    <input type="text" id="latitudeInput">
							<input type="text" id="longitudeInput">
						  </div>
						  <div class="mb-3">
						    <label for="cityInput" class="form-label"> City </label>
						    <input id="cityInput" type="text" class="form-control" placeholder="City" disabled>
						  </div>
						  <div class="mb-3">
						    <label for="streetInput" class="form-label"> Street </label>
						    <input id="streetInput" type="text" class="form-control" placeholder="Street" disabled>
						  </div>
						  <div class="mb-3">
						    <label for="numberInput" class="form-label"> Number </label>
						    <input id="numberInput" type="text" class="form-control" placeholder="Number" disabled>
						  </div>
						  <div class="mb-3">
						    <label for="zipCodeInput" class="form-label"> Zip code </label>
						    <input id="zipCodeInput" type="text" class="form-control" placeholder="ZIP code" disabled>
						  </div>
						<div class="container-for-map mb-3">
							<label for="map" class="form-label"> Select location </label>
							<div id="map" class="map"></div>
						</div>
				        <div class="d-grid gap-2 col-6 mx-auto">
				        	<button type="submit" class="btn btn-primary" :disabled = "managers.length == 0"> Confirm </button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
		<!-- New manager modal -->
		<div class="modal fade" id="userModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newUserLabel" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="newUserLabel">New user</h5>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
				  <form @submit="register(newUser)" method='post'>
				      <div class="modal-body">
						  	<div class="mb-3">
						    <label for="managerMameInput" class="form-label">Name</label>
						    <input v-model="newUser.name" id="managerMameInput" type="text" class="form-control" placeholder="Name">
							</div>
						  	<div class="mb-3">
						    <label for="surnameInput" class="form-label"> Surname </label>
						    <input v-model="newUser.surname" id="surnameInput" type="text" class="form-control" placeholder="Surname">
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
			createMap : function () {
				var map = new ol.Map({
			    target: 'map',
			    layers: [
			      new ol.layer.Tile({
			        source: new ol.source.OSM()
			      })
			    ],
			    view: new ol.View({
			      center: ol.proj.fromLonLat([19.844983346064183, 45.25506515779253]),
			      zoom: 12
			    })
			  });
	
			  map.on('click', function (evt) {
                var coord = ol.proj.toLonLat(evt.coordinate);
				console.log(coord);
                getLocationInfo(coord);
				
				map.getLayers().forEach(layer => {
				  if (layer.get('name') && layer.get('name') == 'pointMarker'){
				      map.removeLayer(layer)
				  }
				});
				
				 var layer = new ol.layer.Vector({
				     source: new ol.source.Vector({
				         features: [
				             new ol.Feature({
				                 geometry: new ol.geom.Point(evt.coordinate)
				             })
				         ]
				     })
				 });
				 layer.set('name', 'pointMarker')
				 map.addLayer(layer);
              })
			},
			userModalOpening: function () {
				this.newUser = {
					userName: "",
					password: "",
					name: "",
					surname: "",
					gender: "",
					dateOfBirth: ""
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
				"role":''+"MANAGER"
			})
			.then(response => {
				$('#userModal').modal('hide');
				this.managers.push(newUser);
				toast("User " + newUser.userName + " successfully registered.");
			})
			.catch(function (error) {
			    if (error.response) {
			    	toast("User " + newUser.userName + " already exists.");
			    }
			});
		},
		createRestaurant : function (newRestaurant) {
			
			event.preventDefault();
			
			newRestaurant.logoPath = document.getElementById("imgForChangeID").src;
			newRestaurant.city = document.getElementById("cityInput").value;
			newRestaurant.street = document.getElementById("streetInput").value;
			newRestaurant.number = document.getElementById("numberInput").value;
			newRestaurant.zipCode = document.getElementById("zipCodeInput").value;
			newRestaurant.latitude = document.getElementById("latitudeInput").value;
			newRestaurant.longitude = document.getElementById("longitudeInput").value;
			
			if(!newRestaurant.city || !newRestaurant.street || !newRestaurant.number || !newRestaurant.zipCode || !newRestaurant.latitude || !newRestaurant.longitude) {
				toast("Please select restaurant location.");
				return;
			}
			
			axios
			.post('rest/restaurants/create', {
				"name":''+newRestaurant.name, 
				"type":''+newRestaurant.type, 
				"status":''+"Open",
				"managerUsername":''+newRestaurant.managerUsername,
				"street":''+newRestaurant.street,
				"number":''+newRestaurant.number,
				"city":''+newRestaurant.city,
				"zipCode":''+newRestaurant.zipCode,
				"logoPath":''+newRestaurant.logoPath,
				"latitude":''+newRestaurant.latitude,
				"longitude":''+newRestaurant.longitude
			})
			.then(response => {
				router.push('/restaurantsadmin');
				toast("Restaurant " + newRestaurant.name + " successfully created.");
			})
			.catch(function (error) {
			    if (error.response) {
			    	toast("Restaurant " + newRestaurant.name + " already exists.");
			    }
			});
		}
	},	
	mounted () {
		this.$nextTick(function () {
			this.createMap();
		})
		axios
          .get('rest/users/getAvailableManagers')
          .then(response => (this.managers = response.data))
	}
});

/**
 * ref: https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
 * @param {*} element 
 */
function encodeImageFileAsURLForChanging(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log("\n ENKODIRANJE SLIKE \n");
        document.getElementById('imgForChangeID')
            .setAttribute(
                'src', reader.result
            );
    }
    reader.readAsDataURL(file);
}

/**
 * Get location info from coordinates 
 * @param coords coords (x,y)
 */
function getLocationInfo(coords) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            // LATITUDE & LONGITUDE
            console.log(coords);
            document.getElementById("longitudeInput").value = coords[0];
            document.getElementById("latitudeInput").value = coords[1];

            // CITY
            console.log(json.address);
            if (json.address.city) {
                document.getElementById("cityInput").value = json.address.city;
            } else if (json.address.city_district) {
                document.getElementById("cityInput").value = json.address.city_district;
            }

            // STREET
            if (json.address.road) {
                document.getElementById("streetInput").value = json.address.road;
            }

            // STREET NUMBER
            if (json.address.house_number) {
                document.getElementById("numberInput").value = json.address.house_number;
            }

            // ZIP CODE
            if(json.address.postcode){
                document.getElementById("zipCodeInput").value = json.address.postcode;
            }

        });
}
