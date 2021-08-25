Vue.component("comment-customer", {
	data: function () {
		return {
			order: {},
			comment: {
				customerUsername: "",
				restaurantName: "",
				commentText: "",
				rating: ""
			}
		}
	},
	template:`
	<div>
		<h3>Leave your comment</h3>
		 <form @submit="leaveComment(comment)" method='post'>
			<textarea v-model="comment.commentText" rows="4" cols="50"></textarea>
			<br><br>
			<input type="number" v-model="comment.rating" placeholder="Rating" required>
			<br><br>
			<button type='submit'> Comment </button>
			<button @click="$router.push('/orders')"> Cancel </button>
		</form>
	</div>
	`,
	methods: {
		leaveComment : function (comment) {
			
			axios
				.post('rest/comments/addComment', {
					"customerUsername":''+this.order.userName, 
					"restaurantName":''+this.order.restaurantName,
					"commentText":''+comment.commentText,
					"rating":''+comment.rating
				
				})
				
			axios.post('rest/orders/changeCommented', {
				"orderID":''+this.order.orderID
			})
				
			this.$router.push('/orders');
			
		}
	},
	mounted () {
		this.order = this.$route.params.data;
	}
});