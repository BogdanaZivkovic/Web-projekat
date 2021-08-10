package beans;

public class CustomerType {
		private String typeName;
		private double discount;
		private int points;
		
		
		public CustomerType() {
			
		}
		
		public CustomerType(String typeName, double discount, int points) {
			super();
			this.typeName = typeName;
			this.discount = discount;
			this.points = points;
		}

		public String getTypeName() {
			return typeName;
		}

		public void setTypeName(String typeName) {
			this.typeName = typeName;
		}

		public double getDiscount() {
			return discount;
		}

		public void setDiscount(double discount) {
			this.discount = discount;
		}

		public int getPoints() {
			return points;
		}

		public void setPoints(int points) {
			this.points = points;
		}
		
		
}
