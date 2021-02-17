package ssm.entity;

public class Address {
	private String addressID;
	private String userid;
	private String addressName;//收件人姓名
	private String area;//地址地区
	private String address;//详细地址
	private String phone;
	private String tag;
	
	public Address() {
		super();
	}

	@Override
	public String toString() {
		return "Address [addressID=" + addressID + ", userid=" + userid + ", addressName=" + addressName + ", area="
				+ area + ", address=" + address + ", phone=" + phone + ", tag=" + tag + "]";
	}

	public String getAddressID() {
		return addressID;
	}

	public void setAddressID(String addressID) {
		this.addressID = addressID;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getAddressName() {
		return addressName;
	}

	public void setAddressName(String addressName) {
		this.addressName = addressName;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}
	
}
