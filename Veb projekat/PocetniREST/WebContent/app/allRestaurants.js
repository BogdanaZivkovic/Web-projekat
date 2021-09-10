Vue.component("all-restaurants-app", {
	data: function() {
		return {
			searchFields: {
				name: '',
				type: '',
				location: '',
				minRating: '',
				maxRating: '',
			},
			filters: {
				type:'',
				status:''
			},
			restaurants: [],
			images: [],
			mapVisible: false
		}
	},
	template: `
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
							<div class="collapse mb-2" id="collapseSearch">
								<div class="card card-colored">
									<div class="row ms-1">
										<input class="input-style" style="width: 160px;" type="text" v-model="searchFields.name" placeholder="Restaurant name">
										<input class="input-style" style="width: 160px;" type="text" v-model="searchFields.type" placeholder="Restaurant type">
									</div>
									<div class="row mb-1">
										<div class="ms-1">
										<input id="cityInput" class="input-style" style="width: 160px;" type="text" v-model="searchFields.location" placeholder="Restaurant location">
										<a href="#" v-on:click="showMap()"><i class="bi bi-geo-alt-fill"></i></a>
										</div>
									</div>
									<div class="row ms-1">
										<input class="input-style" style="width: 130px;" type="number" min="0" max="5" v-model="searchFields.minRating" placeholder="Min rating">
										<input class="input-style" style="width: 130px;" type="number" min="0" max="5" v-model="searchFields.maxRating" placeholder="Max rating">
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
								    <li><a class="dropdown-item" href="#" v-on:click="sortLocationAsc">Location ascending</a></li>
				 					<li><a class="dropdown-item" href="#" v-on:click="sortLocationDesc">Location descending</a></li>
								 	<li><a class="dropdown-item" href="#" v-on:click="sortRatingAsc">Rating ascending</a></li>
				 					<li><a class="dropdown-item" href="#" v-on:click="sortRatingDesc">Rating descending</a></li>
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
								<div class="row">
							 		<div class="col-lg-6 col-md-6 col-sm-6">
										<label> Restaurant type: </label>
										<select style="margin: 5px;" class="selectpicker select-nice"v-model="filters.type">
											<option disabled value="">Please select one</option>
											<option value="">All</option>
											<option>Chinese</option>
											<option>Italian</option>
											<option>Fast food</option>
											<option>BBQ</option>
											<option>Mexican</option>
											<option>Gyros</option>
										</select>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6">
									<label> Restaurant status: </label>
									<select style="margin: 5px;" class="selectpicker select-nice" v-model="filters.status">
										<option disabled value="">Please select one</option>
										<option value=""> All </option>
										<option> Open </option>
									</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row m-4">
						<div class="container-for-map mb-3" v-if="mapVisible">
							<div id="map" class="map"></div>
						</div>
					</div>	
				</div>
			</div>
		</div>
		
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-10 col-sm-12">
				<ul class="list-unstyled list-group">
					<li>
						<a href="#" v-on:click="viewRestaurant(restaurant)" class="list-group-item list-group-item-action li-container" v-for ="restaurant in filteredRestaurants">			
							<div class="container">
								<div class="row">
									<div class="col-lg-3 col-md-4 col-sm-5"> 
										<div class="container-for-logo">
											<div class="circular">
											<img class="img-responsive" v-bind:src="getLogoPath(restaurant)"> 
											</div>
										</div>
									</div>
									<div class="col-lg-9 col-md-8 col-sm-7"> 
										<div class="d-flex w-100 justify-content-between ms-2">
											<h4 class="mb-1"> {{restaurant.name}} </h4>
											<span v-if="restaurant.status == 'Open'" class="badge bg-success mb-2"> &check; Open </span>
											<span v-if="restaurant.status == 'Closed'" class="badge bg-danger mb-2"> &#10005; Closed </span>
										</div>
										<p class="mb-1 lead">{{restaurant.type}}  </p>
										<p class="mb-1"> {{restaurant.location.address.street}} {{restaurant.location.address.number}}, {{restaurant.location.address.city}} {{restaurant.location.address.zipCode}} </p>
										<div class="d-flex">
											<i class="bi bi-star-fill" style="color:#ffc40c"></i>
											<label style="color:#ffc40c">&nbsp{{restaurant.averageRating.toFixed(2)}} </label>
										</div>
									</div>
								</div>
							</div>
						</a>	
					</li>
				</ul>
			</div>
		</div>
	</div>
	`,
	methods:{
			showMap : function () {
				this.mapVisible = !this.mapVisible;
				if (this.mapVisible) {
					this.$nextTick(function () {
						this.createMap();
					})	
				}
			},
			createMap : function () {
				var map = new ol.Map({
			    target: 'map',
			    layers: [
			      new ol.layer.Tile({
			        source: new ol.source.OSM()
			      })
			    ],
			    view: new ol.View({
			      center: ol.proj.fromLonLat([20.447166861840312, 44.81481340170686]),
			      zoom: 7
			    })
			  });
	
			  map.on('click', function (evt) {
                var coord = ol.proj.toLonLat(evt.coordinate);
				console.log(coord);
                getSelectedCity(coord);
				
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
		matchesSearch: function (restaurant) {
			if(!restaurant.name.toLowerCase().match(this.searchFields.name.toLowerCase()))
				return false;
			if(!restaurant.type.toLowerCase().match(this.searchFields.type.toLowerCase()))
				return false;
			if(!restaurant.location.address.city.toLowerCase().match(this.searchFields.location.toLowerCase()))
				return false;
			if(!restaurant.type.toLowerCase().match(this.filters.type.toLowerCase()))
				return false;
			if(!restaurant.status.toLowerCase().match(this.filters.status.toLowerCase()))
				return false;
			if(restaurant.averageRating < parseFloat(this.searchFields.minRating))
				return false;
			if(restaurant.averageRating > parseFloat(this.searchFields.maxRating))
				return false;
			return true;
		},
		sortNameAsc: function () {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(a.name, b.name)});
		},
		sortNameDesc: function () {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(b.name, a.name)});
		},
		sortLocationAsc: function() {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(a.location.address.city, b.location.address.city)});
		},
		sortLocationDesc: function() {
			this.restaurants.sort((a, b) => {return this.alphaNumCriterium(b.location.address.city, a.location.address.city)});
		},
		sortRatingAsc: function() {
			this.restaurants.sort((a, b) => {return a.averageRating - b.averageRating})
		},
		sortRatingDesc: function() {
			this.restaurants.sort((a, b) => {return b.averageRating - a.averageRating})
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
		viewRestaurant: function (restaurant) {
			let data = restaurant;
      		this.$router.push({
        		name: "viewRestaurant",
       			params: { data }
      		});
		},
		getLogoPath: function (restaurant) {
            let imageDefault = "data:image/png;base64,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";

            if (restaurant.logoPath == "withoutPath")				
                return imageDefault;

            let retImage;

            retImage = this.getImageBase64FromId(parseInt(restaurant.logoPath, 10));

            return retImage;

        },
        getImageBase64FromId: function (idOfImage) {
            let base64Image;

            for (let el of this.images) {
                if (el.id == idOfImage) {
                    base64Image = el.base64;
                    break;
                }
            }
            return base64Image;
        }
	},
	mounted () {
		this.$nextTick(function () {
			this.createMap();
		})			
		axios
			.get('rest/restaurants/getAllRestaurants')
			.then(response => {
				this.restaurants = response.data
				this.restaurants.sort((a, b) => (a.status > b.status) ? -1 : 1);
				axios.get('rest/images/getImages')
				.then(response => (this.images = response.data));
			})	

	},
	computed: {
		filteredRestaurants: function() {
			return this.restaurants.filter((restaurant) => {
				return this.matchesSearch(restaurant);
			});
		}
	},
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
function getSelectedCity(coords) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
        .then(function (response) {
            return response.json();
        }).then(function (json) {

            // CITY
            console.log(json.address);
			let el = document.getElementById("cityInput");
            if (json.address.city) {
                el.value = json.address.city;
            } else if (json.address.city_district) {
                el.value = json.address.city_district;
            }
			el.dispatchEvent(new Event('input'));
        });
}