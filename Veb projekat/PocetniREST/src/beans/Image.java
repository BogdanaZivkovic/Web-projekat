package beans;

public class Image {
	
	private Integer ID;
	private String base64;
	
	public Image() {
		
	}
	
	public Image(Integer iD, String base64) {
		super();
		ID = iD;
		this.base64 = base64;
	}
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getBase64() {
		return base64;
	}
	public void setBase64(String base64) {
		this.base64 = base64;
	}
	
	

}
