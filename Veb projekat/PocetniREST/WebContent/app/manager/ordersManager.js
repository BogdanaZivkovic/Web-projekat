Vue.component("orders-manager", {
	data: function() {
		return {
			orders: [],
			search: {
				minPrice:'',
				maxPrice:'',
				minDate: '',
				maxDate:''
			},
			filter: {
				type:'',
				status:''
			},
			images: [],
			viewedItem: {},
			viewedOrder: {}
		}
	},
	template:`
	<div>
		<div class="container-fluid bg-1">
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
											<input class="input-style" style="width: 160px;" type="number" v-model="search.minPrice" placeholder="Min price">
											<input class="input-style" style="width: 160px;" type="number" v-model="search.maxPrice" placeholder="Max price">
										</div>
										<div class="row ms-1">
											<label> Min date: </label>
											<input class="input-style" style="width: 200px;" type="date" v-model="search.minDate" placeholder="Min date">
											<label> Max date: </label>
											<input class="input-style" style="width: 200px;" type="date" v-model="search.maxDate" placeholder="Max date">
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
									    <li><a class="dropdown-item" href="#" v-on:click="sortPriceAsc">Price ascending</a></li>
									    <li><a class="dropdown-item" href="#" v-on:click="sortPriceDesc">Price descending </a></li>
									    <li><a class="dropdown-item" href="#" v-on:click="sortDateAsc">Date ascending</a></li>
					 					<li><a class="dropdown-item" href="#" v-on:click="sortDateDesc">Date descending</a></li>
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
											<label> Order status: </label>
											<select style="margin: 5px;" class="selectpicker select-nice" v-model="filter.status">
												<option disabled value="">Please select one</option>
												<option value="">All</option>
												<option> PROCESSING </option>
												<option> IN_PREPARATION </option>
												<option> WAITING_FOR_DELIVERY </option>
												<option> IN_TRANSPORT </option>
												<option> DELIVERED </option>
												<option> CANCELED </option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>	
					</div>	
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-lg-7 col-md-8 col-sm-10">
					<ul class="list-group">
						<li class="list-group-item li-container" v-for = "order in filteredOrders">
							<div class="container">
								<div class="row">
									<div class="col-lg-10 col-md-9 col-sm-8">
										<h5> {{order.restaurantName}} </h5>
										<p class="mb-1"> <i> {{order.status}} </i> </p>
										<p class="mb-1" style="color: rgba(31, 54, 25)"> <b> {{order.userName}} </b> </p>
										<p class="mb-1"> {{formatDate(order.dateAndTime)}} </p>
									</div>
									<div class="col-lg-2 col-md-3 col-sm-4 mt-2 p-2 text-end">
										<button class="btn btn-success" v-if="order.status.match('PROCESSING')" @click="prepareOrder(order)"> ACCEPT </button>
										<button class="btn btn-success" v-if="order.status.match('IN_PREPARATION')" @click="orderReady(order)"> READY </button>
										<button class="btn btn-success position-relative" v-if="order.status.match('WAITING_FOR_DELIVERY') && order.requests.length > 0" @click="setViewedOrder(order)" data-bs-toggle="modal" data-bs-target="#requestsModal">
											Requests
											<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
										    	{{order.requests.length}}
											</span>
										</button>
									</div>
								</div>
								<div class="row justify-content-between">
									<div class="col-lg-6 col-md-7 col-sm-8">
										<ul class="list-unstyled list-group m-2">
											<li>
												<a href="#" class="list-group-item list-group-item-action p-2" v-on:click="setViewedItem(i.item)" data-bs-toggle="modal" data-bs-target="#exampleModal" v-for = "i in order.items">
													<div class="d-flex justify-content-between">
														<p class="mb-1 ms-2"> 
															<b> {{i.count}} x {{i.item.name}} &nbsp &nbsp &nbsp</b>  
														</p>
														<p class="mb-1 text-right"> 
															{{i.count*i.item.price}} $
														</p>
													</div>
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="row">
									<small m-2> <b> Discount: {{calculateDiscount(order)}} % </b> </small>
									<div class="d-flex justify-content-between">
										<p class="mb-1 lead"> Total price: {{order.price}} $ </p>
										<button class = "mb-1 btn btn-outline-secondary btn-sm" @click= "deleteOrder(order)"> <i class="bi bi-trash"></i> </button>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>		
		
		<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
		    	<div class="modal-content">
		      		<div class="modal-header">
		        		<h5 class="modal-title" id="exampleModalLabel">{{this.viewedItem.name}}</h5>
		        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		     		</div>
		      		<div class="modal-body">
						<div class="container">
							<div class="row">
								<div class="col-lg-3 col-md-3 col-sm-3">
									<img height="100" width="100" class="rounded" v-bind:src="getLogoPath(this.viewedItem)">
								</div>
								<div class="col-lg-9 col-md-9 col-sm-9 d-flex flex-column">
									<p class="fw-bold mb-1">{{this.viewedItem.quantity}}</p>
									<small>{{this.viewedItem.description}} </small>
									<p style="color:rgba(58, 112, 27);" class="lead mb-1">{{this.viewedItem.price}} $</p>
								</div>
							</div>
						</div>
		      		</div>
		    	</div>
		  	</div>
		</div>
		
		
		
		<!-- Modal -->
		<div class="modal fade" id="requestsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="requestsLabel" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="requestsLabel"> Order requests </h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
				<ul class="list-unstyled list-group m-2">
					<li v-for = "request in viewedOrder.requests" class="list-group-item p-2">
						<div class="d-flex justify-content-between">
							<p class="mb-1 ms-2"> 
								<b> {{request}} </b>  
							</p>
							<button class="btn btn-outline-success btn-sm" @click = "approveDelivery(viewedOrder, request)"> <i class="bi bi-check2"></i> </button>
						</div>
					</li>
				</ul>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
		
		
	</div>
	`,
	methods: {
		deleteOrder: function (order) {
			if (confirm('Are you sure?') == true) {
				axios
				.post('rest/orders/deleteForRestaurant', {
					"orderID": order.orderID
				})
				.then(response => {
					this.init();
					toast("Order deleted.");
				});
			}
		},
		setViewedOrder: function (order) {
			this.viewedOrder = Object.assign({}, order);
		},
		calculateDiscount: function(order){
			var sum = 0
  			for(let i=0; i<order.items.length; i++) {
  			sum += order.items[i].item.price * order.items[i].count;
				}
			return 100 - order.price/sum*100;
			
		},
		setViewedItem: function(item){
			this.viewedItem = Object.assign({}, item);
		},
		approveDelivery : function (order, request) {
			axios
				.post('rest/orders/approveDelivery', {
					'orderID':''+order.orderID,
					'userName':''+request
				})
				.then(response => {
					this.init();
					$('#requestsModal').modal('hide');
					toast("Delivery assigned to " + request + ".");
				});
		},
		prepareOrder: function (order) {
			axios
				.post('rest/orders/changeStatus', {
					'orderID':''+order.orderID,
					'status':'IN_PREPARATION'
				})
				.then(response => {
					this.init();
					toast("Order accepted.");
				});
		},
		orderReady: function (order) {
			axios
				.post('rest/orders/changeStatus', {
					'orderID':''+order.orderID,
					'status':'WAITING_FOR_DELIVERY'
				})
				.then(response => {
					this.init()
					toast("Order ready.");
				});
		},
		formatDate: function(dateMillisec) {
			var date = new Date(dateMillisec)
			var hours = date.getHours();
  			var minutes = date.getMinutes();
  			var ampm = hours >= 12 ? 'pm' : 'am';
  			hours = hours % 12;
  			hours = hours ? hours : 12; // the hour '0' should be '12'
  			minutes = minutes < 10 ? '0'+minutes : minutes;
  			var strTime = hours + ':' + minutes + ' ' + ampm;
  			return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
		},
		init: function() {
			axios
			.get('rest/orders/getOrdersRestaurant')
			.then(response =>(this.orders = response.data))	
			
			axios
			.get('rest/images/getImages')
			.then(response => (this.images = response.data));
		},
		matchesSearch: function(order) {
			if(order.price < parseInt(this.search.minPrice, 10))
				return false;
			if(order.price > parseInt(this.search.maxPrice, 10))
				return false;
			if(order.dateAndTime < Date.parse(this.search.minDate))
				return false;
			if(order.dateAndTime > Date.parse(this.search.maxDate))
				return false;
			if(!order.status.match(this.filter.status))
				return false;
			return true;
		},
		sortPriceAsc: function() {
			this.orders.sort((a, b) => {return a.price - b.price})
		},
		sortPriceDesc: function() {
			this.orders.sort((a, b) => {return b.price - a.price})
		},
		sortDateAsc: function() {
			this.orders.sort((a,b) => {return a.dateAndTime - b.dateAndTime})
		},
		sortDateDesc: function() {
			this.orders.sort((a,b) => {return b.dateAndTime - a.dateAndTime})
		},
		getLogoPath: function (sth) {
					 let imageDefault = "data:image/png;base64,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";

					 if (sth.logoPath == "withoutPath")
							 return imageDefault;

					 let retImage;

					 retImage = this.getImageBase64FromId(parseInt(sth.logoPath, 10));

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
		this.init();
	},
	computed: {
		filteredOrders: function() {
			return this.orders.filter((order) => {
				return this.matchesSearch(order);
			});
		}
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
