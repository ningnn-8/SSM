package ssm.entity;

public class Shopcar {
	private String id;
	private String userid;
	private String goodsid;
	private int goodsNum;
	@Override
	public String toString() {
		return "Shopcar [id=" + id + ", userid=" + userid + ", goodsid=" + goodsid + ", goodsNum=" + goodsNum + "]";
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getGoodsid() {
		return goodsid;
	}
	public void setGoodsid(String goodsid) {
		this.goodsid = goodsid;
	}
	public int getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(int goodsNum) {
		this.goodsNum = goodsNum;
	}
	
	
}
