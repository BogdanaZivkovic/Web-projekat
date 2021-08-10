package beans;

public class Image {
	
	private Integer ID;
	private String Base64;
	
	public Image() {
		
	}
	
	public Image(Integer iD, String base64) {
		super();
		ID = iD;
		Base64 = base64;
	}
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getBase64() {
		return Base64;
	}
	public void setBase64(String base64) {
		Base64 = base64;
	}
	
	

}
