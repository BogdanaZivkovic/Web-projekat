Vue.component("view-restaurant-customer", {
	data: function() {
		return {
			restaurant: {},
			items: [],
			images: [],
			comments: [],
			sc: [],
			totalPrice: 0.0,
			discount: '',
			editedScItem: {
				item: {
					itemID:0,
					name: "",
					price: 0.0,
					type: "",
					restaurantName: "",
					quantity: "",
					description: "",
					isDeleted: false,
					logoPath: "",
				},
				count: 0
			}
		}
	},
	template:`
	<div>
		<div class="container-fluid bg">
			<div class="row justify-content-center">
				<div class="col-lg-8 col-md-10 col-sm-12 container-neutral">
					<div class="d-flex mb-2">
						<div class="circular--small me-2">
							<img v-bind:src="getLogoPath(restaurant)">
						</div>
						<h2> {{restaurant.name}} </h2>
					</div>
					<div class="d-flex">
						<i class="bi bi-star-fill" style="color:#ffc40c"></i>
						<label style="color:#ffc40c">&nbsp{{restaurant.averageRating.toFixed(2)}} </label>
					</div>
					<p class="mb-1 lead">{{restaurant.type}}  </p>
					<p class="mb-1"> {{restaurant.location.address.street}} {{restaurant.location.address.number}}, {{restaurant.location.address.city}} {{restaurant.location.address.zipCode}} </p>
					<span v-if="restaurant.status == 'Open'" class="badge bg-success mb-2"> &check; Open </span>
					<span v-if="restaurant.status == 'Closed'" class="badge bg-danger mb-2"> &#10005; Closed </span>
					<h5 class="border-bottom"> Items </h5>
					<ul class="list-group mb-2">
						<li class="list-group-item" v-for="i in items">
							<div class="container">
								<div class="row justify-content-between">
									<div class="col-lg-10 col-md-9 col-sm-8 d-flex flex-column">
										<p class="fw-bold mb-1"> {{i.item.name}} </p>
										<small>{{i.item.quantity}}</small>
										<small>{{i.item.description}} </small>
										<p class="lead mb-1">{{i.item.price}} $</p>
									</div>
									<div class="col-lg-2 col-md-3 col-sm-4">
										<img height="100" width="100" class="rounded float-end" v-bind:src="getLogoPath(i.item)">
									</div>
									<div class="row">
										<div class="col-sm-12 text-end">
											<input v-if="restaurant.status.match('Open')" type="number" v-model="i.count" placeHolder="Count" min="1">
											<button class="btn btn-success" v-if="restaurant.status.match('Open')" @click="selectItem(i)"> Add </button>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<h5 class="border-bottom"> Comments </h5>
					<ul class="list-group">
						<li class="list-group-item" v-for="comment in comments">
							<div class="d-flex justify-content-between border-bottom">
								<label> {{comment.customerUsername}} </label>
								<div class="d-flex">
									<i class="bi bi-star-fill" style="color:#ffc40c"></i>
									<label style="color:#ffc40c"> {{comment.rating}} </label>
								</div>
							</div>
							<p> {{comment.commentText}} </p>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div v-if="sc.length > 0" class="fixed-bottom">
			<div class="d-grid gap-2 col-lg-4 col-md-5 col-sm-6 mx-auto">
  				<button class="btn btn-warning btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#shoppingCart">
					<div class="d-flex justify-content-between">
					<span class="badge bg-light text-dark">{{this.sc.length}}</span>
					<p class="m-0">Shopping cart</p>
					<p class="m-0">{{this.totalPrice}}$</p>
					</div>
				</button>
			</div>
		</div>

		<!-- MODALS -->
		
			<!-- Modal for shopping cart -->
			<div class="modal fade" id="shoppingCart" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="shoppingCartLabel" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="shoppingCartLabel"> Shopping cart </h5>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
				  <div class="modal-body">
					<ul class="list-group">
						<li class="list-group-item" v-for = "i in sc">
							<div class="d-flex justify-content-between">
								<div class="d-flex flex-row">
									<p class="fw-bold mb-1 me-2"> {{i.item.name}} </p>
									<p> x{{i.count}} </p>
								</div>
								<p> {{i.count*i.item.price}}$ </p>
							</div>
							<div class="d-flex flex-row-reverse">
								<button class = "m-1 btn btn-outline-secondary btn-sm" @click="openEditModal(i)" data-bs-toggle="modal" data-bs-target="#editItem"> <i class="bi bi-pencil-square"></i> </button>
								<button class = "m-1 btn btn-outline-secondary btn-sm" @click= "deleteItem(i)"> <i class="bi bi-x-square"></i> </button>
							</div>
						</li>
						<div class="d-flex justify-content-between border-bottom">
							<p class="fw-bold mb-1 ms-3"> Discount: </p>
							<p class="fw-bold mb-1 me-3"> {{discount}} </p>
						</div>
						<div class="d-flex justify-content-between">
							<p class="fw-bold mb-1 ms-3"> Total: </p>
							<p class="fw-bold mb-1 me-3"> {{totalPrice}}$ </p>
						</div>
				 	</ul>
				  </div>
				  <div class="modal-footer">
				  	<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
				  	<button type="button" class="btn btn-warning" @click="createOrders"> Order </button>
				  </div>
			    </div>
			  </div>
			</div>
			
			
			<!-- Modal for editing an item -->
			<div class="modal fade" id="editItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editItemLabel" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="editItemLabel"> Change quantity </h5>
			        <button type="button" class="btn-close" @click="closeEditModal" data-bs-toggle="modal" data-bs-target="#shoppingCart" aria-label="Close"></button>
			      </div>
					  <div class="modal-body">
						<div class="d-flex justify-content-between align-items-center">
							<p class="fw-bold mb-1 me-2"> {{editedScItem.item.name}} </p>
							<input type="number" v-model="editedScItem.count" min="1">
							<p class="mb-1"> {{editedScItem.count*editedScItem.item.price}}$ </p>
						</div>
					  </div>
					  <div class="modal-footer">
					  	<button type="button" class="btn btn-outline-secondary" @click="closeEditModal" data-bs-toggle="modal" data-bs-target="#shoppingCart">Cancel</button>
					  	<button type="button" @click="editQuantity" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#shoppingCart"> OK </button>
					  </div>
			    </div>
			  </div>
			</div>

		
	</div>
	`,
	methods: {
		editQuantity : function () {
			axios
			.post('rest/shoppingCart/editQuantity', {
				item: this.editedScItem.item,
				"count":''+this.editedScItem.count
			})
			.then(response => {
				this.getShoppingCart();
				$('#editItem').modal('hide');
			})
		},
		closeEditModal: function() {
			$('#editItem').modal('hide');
		},
		openEditModal: function(shoppingCartItem) {
			this.editedScItem = Object.assign({}, shoppingCartItem);
			$('#shoppingCart').modal('hide');
		},
		getShoppingCart: function () {
			axios
				.get('rest/shoppingCart/getJustSc')
				.then(response=>(this.sc = response.data))
					
				axios
				.get('rest/shoppingCart/getScTotal')
				.then(response=>(this.totalPrice = response.data))
		},
		deleteItem: function (shoppingCartItem) {
			axios
			.post('rest/shoppingCart/removeItem', {
				itemID: shoppingCartItem.item.itemID,
			})
			.then(response => {
				axios.all([
					axios
					.get('rest/shoppingCart/getJustSc')
					.then(response=>(this.sc = response.data)),
						
					axios
					.get('rest/shoppingCart/getScTotal')
					.then(response=>(this.totalPrice = response.data))
				])
				.then(response => {
					if(this.sc.length == 0) {
						$('#shoppingCart').modal('hide');
					}
				})
			})
		},
		createOrders : function () {
			axios
			.post('rest/orders/create')
			.then(response => {
				$('#shoppingCart').modal('hide');
				this.sc = [];
				this.totalPrice = 0.0;
				toast("Your order has been delivered.");
			});
		},
		selectItem : function (shoppingCartItem) {
			axios
			.post('rest/shoppingCart/add', {
				item: shoppingCartItem.item,
				"count":''+shoppingCartItem.count
			})
			.then(response => {
				this.getShoppingCart();
				toast('' + shoppingCartItem.item.name +" x "  + shoppingCartItem.count +" added to shopping cart.");
			});
		},
		getLogoPath: function (item) {
					 let imageDefault = "data:image/png;base64,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";

					 if (item.logoPath == "withoutPath")
							 return imageDefault;

					 let retImage;

					 retImage = this.getImageBase64FromId(parseInt(item.logoPath, 10));

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
	mounted() {
		this.restaurant = this.$route.params.data;
		axios
          .get('rest/items/getAllItems')
          .then(response => {
			response.data.forEach(el => {
				if (el.restaurantName == this.restaurant.name) {
					let shoppingCartItem = {item:el, count:1}
					this.items.push(shoppingCartItem);
				}
			})
		})
		axios
			.get('rest/images/getImages')
			.then(response => (this.images = response.data));
		axios
			.post('rest/shoppingCart/initSc', {
				name:''+this.restaurant.name
			})
			.then(response => {
				axios
				.get('rest/shoppingCart/getJustSc')
				.then(response => (this.sc = response.data))
				
				axios
				.get('rest/shoppingCart/getScTotal')
				.then( response => (this.totalPrice = response.data))
			})
		axios
			.get('rest/comments/getAccepted')
			.then(response => {
				response.data.forEach(el => {
					if (el.restaurantName == this.restaurant.name) {
						this.comments.push(el);
					}
				})						
			})
		axios
				.get('rest/shoppingCart/getDiscount')
				.then( response => (this.discount = response.data))
	}
});
