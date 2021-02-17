package ssm.entity;

public class ShopcarShow {
	private String goodsid;
	private String goodsName;
	private int goodsNum;
	private float goodsPrice;
	private String cover;
	@Override
	public String toString() {
		return "ShopcarShow [goodsid=" + goodsid + ", goodsName=" + goodsName + ", goodsNum=" + goodsNum
				+ ", goodsPrice=" + goodsPrice + ", cover=" + cover + "]";
	}
	public String getGoodsid() {
		return goodsid;
	}
	public void setGoodsid(String goodsid) {
		this.goodsid = goodsid;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public int getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(int goodsNum) {
		this.goodsNum = goodsNum;
	}
	public float getGoodsPrice() {
		return goodsPrice;
	}
	public void setGoodsPrice(float goodsPrice) {
		this.goodsPrice = goodsPrice;
	}
	public String getCover() {
		return cover;
	}
	public void setCover(String cover) {
		this.cover = cover;
	}
	
}
