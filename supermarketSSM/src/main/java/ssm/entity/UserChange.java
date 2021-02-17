package ssm.entity;

public class UserChange {
	public String uid;
	public String cUserName;
	public String cPassword;
	public int cJiaoseid;
	public UserChange() {
		super();
	}
	public UserChange(String uid, String cUserName, String cPassword, int cJiaoseid) {
		super();
		this.uid = uid;
		this.cUserName = cUserName;
		this.cPassword = cPassword;
		this.cJiaoseid = cJiaoseid;
	}
	@Override
	public String toString() {
		return "UserChange [uid=" + uid + ", cUserName=" + cUserName + ", cPassword=" + cPassword + ", cJiaoseid="
				+ cJiaoseid + "]";
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getcUserName() {
		return cUserName;
	}
	public void setcUserName(String cUserName) {
		this.cUserName = cUserName;
	}
	public String getcPassword() {
		return cPassword;
	}
	public void setcPassword(String cPassword) {
		this.cPassword = cPassword;
	}
	public int getcJiaoseid() {
		return cJiaoseid;
	}
	public void setcJiaoseid(int cJiaoseid) {
		this.cJiaoseid = cJiaoseid;
	}
	
}
