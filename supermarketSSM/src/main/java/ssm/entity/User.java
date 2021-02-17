package ssm.entity;

public class User {
	private String uid;
	private String username;
	private String password;
	private int jiaoseid;
	private String phone;
	public User() {
		super();
	}
	@Override
	public String toString() {
		return "User [uid=" + uid + ", username=" + username + ", password=" + password + ", jiaoseid=" + jiaoseid
				+ ", phone=" + phone + "]";
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getJiaoseid() {
		return jiaoseid;
	}
	public void setJiaoseid(int jiaoseid) {
		this.jiaoseid = jiaoseid;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
	
}
