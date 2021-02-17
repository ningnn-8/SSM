package ssm.entity;

public class SaleDetails {
	private String id;
	private String saleID;
	private String goodsID;
	private int buyNum;
	private Float price;
	@Override
	public String toString() {
		return "SaleDetails [id=" + id + ", saleID=" + saleID + ", goodsID=" + goodsID + ", buyNum=" + buyNum
				+ ", price=" + price + "]";
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSaleID() {
		return saleID;
	}
	public void setSaleID(String saleID) {
		this.saleID = saleID;
	}
	public String getGoodsID() {
		return goodsID;
	}
	public void setGoodsID(String goodsID) {
		this.goodsID = goodsID;
	}
	public int getBuyNum() {
		return buyNum;
	}
	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	
}
