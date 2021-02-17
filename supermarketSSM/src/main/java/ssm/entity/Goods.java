package ssm.entity;

//��Ʒ
public class Goods {
	private String id;// id
	private String gname;// ����
	private float price = 0;// �ۼ�
	private int stock;// �����
	private int sale = 0;// ����
	private String cover = "";// ����ͼ����
	private String tag;
	private String expatiate;
	private String isSale = "否";// �Ƿ�����
	
	
	@Override
	public String toString() {
		return "Goods [id=" + id + ", gname=" + gname + ", price=" + price + ", stock=" + stock + ", sale=" + sale
				+ ", cover=" + cover + ", tag=" + tag + ", expatiate=" + expatiate + ", isSale=" + isSale + "]";
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getGname() {
		return gname;
	}
	public void setGname(String gname) {
		this.gname = gname;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public int getSale() {
		return sale;
	}
	public void setSale(int sale) {
		this.sale = sale;
	}
	public String getCover() {
		return cover;
	}
	public void setCover(String cover) {
		this.cover = cover;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getExpatiate() {
		return expatiate;
	}
	public void setExpatiate(String expatiate) {
		this.expatiate = expatiate;
	}
	public String getIsSale() {
		return isSale;
	}
	public void setIsSale(String isSale) {
		this.isSale = isSale;
	}
	
}
