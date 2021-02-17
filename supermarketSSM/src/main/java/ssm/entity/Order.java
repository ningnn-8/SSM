package ssm.entity;

public class Order {
	private int id;
	private String oname;
	private int num;
	private float inPrice;
	private String time;
	private String supply;
	public Order(int id, String oname, int num, float inPrice, String time, String supply) {
		super();
		this.id = id;
		this.oname = oname;
		this.num = num;
		this.inPrice = inPrice;
		this.time = time;
		this.supply = supply;
	}
	
	public Order() {
		super();
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getoname() {
		return oname;
	}
	public void setoname(String oname) {
		this.oname = oname;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public float getInPrice() {
		return inPrice;
	}
	public void setInPrice(float inPrice) {
		this.inPrice = inPrice;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getSupply() {
		return supply;
	}
	public void setSupply(String supply) {
		this.supply = supply;
	}
	@Override
	public String toString() {
		return "Order [id=" + id + ", oname=" + oname + ", num=" + num + ", inPrice=" + inPrice + ", time=" + time
				+ ", supply=" + supply + "]";
	}
	
	
}
