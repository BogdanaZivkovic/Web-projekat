Vue.component("add-item-manager", {
	data: function() {
		return {
			item: {
				name: "",
				price: "",
				type: "",
				restaurantName: "",
				quantity: "",
				description: "",
				logoPath: "",
			}
		}
	},
	template:`
	<div>
		<form @submit="addItem(item)" method='post'>
			<input type="text" v-model="item.name" placeholder="Name" required>
			<br><br>
			<input type="number" v-model="item.price" placeholder="Price" required>
			<br><br>
			<input type="file" onchange="encodeImageFileAsURLForChanging(this)" />
			<img hidden id="imgForChangeID"  src="" alt="Image of restaurant" width="11" height="11">
			<label>Type:</label>
			<select v-model="item.type">
		    	<option disabled value="">Please select one</option>
		    	<option> FOOD </option>
		    	<option> DRINK </option>
			</select>
			<input type="text" v-model="item.quantity" placeholder="Quantity">
			<br><br>
			<input type="text" v-model="item.description" placeholder="Description">
			<br><br>
			<button type='submit'> OK </button>
			<button @click="$router.push('/restaurantmanager')"> Cancel </button>
		</form>
	</div>
	`,
	methods: {
		addItem : function (item) {
			
			this.item.logoPath = document.getElementById("imgForChangeID").src;
			
			axios
			.post('rest/items/addItem', {
				"name":''+item.name, 
				"price":''+item.price, 
				"type":''+item.type, 
				"quantity":''+item.quantity, 
				"restaurantName":''+item.restaurantName,
				"description":''+item.description,
				"logoPath":''+item.logoPath
			})
			this.$router.push('/restaurantmanager');
		}
	},
	mounted () {
		this.item.restaurantName = this.$route.params.data;
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