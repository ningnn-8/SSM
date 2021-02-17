package ssm.entity;

public class GoodsChange {
	public String id;//商品id
	public String cGname;//修改的商品名
	public Float cPrice;//修改的价格
	public int cStock;//修改的库存
	public int cSale;
	public String cTag;
	public String cExpatiate;
	public String cCover;
	public String cIsSale;//修改的上架信息
	public GoodsChange() {
		super();
	}
	@Override
	public String toString() {
		return "GoodsChange [id=" + id + ", cGname=" + cGname + ", cPrice=" + cPrice + ", cStock=" + cStock + ", cSale="
				+ cSale + ", cTag=" + cTag + ", cExpatiate=" + cExpatiate + ", cCover=" + cCover + ", cIsSale="
				+ cIsSale + "]";
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getcGname() {
		return cGname;
	}
	public void setcGname(String cGname) {
		this.cGname = cGname;
	}
	public Float getcPrice() {
		return cPrice;
	}
	public void setcPrice(Float cPrice) {
		this.cPrice = cPrice;
	}
	public int getcStock() {
		return cStock;
	}
	public void setcStock(int cStock) {
		this.cStock = cStock;
	}
	public int getcSale() {
		return cSale;
	}
	public void setcSale(int cSale) {
		this.cSale = cSale;
	}
	public String getcTag() {
		return cTag;
	}
	public void setcTag(String cTag) {
		this.cTag = cTag;
	}
	public String getcExpatiate() {
		return cExpatiate;
	}
	public void setcExpatiate(String cExpatiate) {
		this.cExpatiate = cExpatiate;
	}
	public String getcCover() {
		return cCover;
	}
	public void setcCover(String cCover) {
		this.cCover = cCover;
	}
	public String getcIsSale() {
		return cIsSale;
	}
	public void setcIsSale(String cIsSale) {
		this.cIsSale = cIsSale;
	}
	
}
