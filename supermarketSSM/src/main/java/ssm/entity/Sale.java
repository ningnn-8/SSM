package ssm.entity;

public class Sale  extends Shopcar{
	private String id;
	private String userID;
	private String addressID;
	private String time;
	private String type;
	private String code;
	@Override
	public String toString() {
		return "Sale [id=" + id + ", userID=" + userID + ", addressID=" + addressID + ", time=" + time + ", type="
				+ type + ", code=" + code + "]";
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getAddressID() {
		return addressID;
	}
	public void setAddressID(String addressID) {
		this.addressID = addressID;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
}
