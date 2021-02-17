package ssm.entity;

public class Page {
	//条件
	private String tiaojian;
	//limit
	private int limit;
	//每页数量
	private int pageItem;
	//排序方法
	private String sort = "";
	public Page(String tiaojian, int limit, int pageItem, String sort) {
		super();
		this.tiaojian = tiaojian;
		this.limit = limit;
		this.pageItem = pageItem;
		this.sort = sort;
	}
	public Page() {
		super();
	}
	
	@Override
	public String toString() {
		return "分页条件 [tiaojian=" + tiaojian + ", limit=" + limit + ", pageItem=" + pageItem + ", sort=" + sort + "]";
	}
	public String getTiaojian() {
		return tiaojian;
	}
	public void setTiaojian(String tiaojian) {
		this.tiaojian = tiaojian;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getPageItem() {
		return pageItem;
	}
	public void setPageItem(int pageItem) {
		this.pageItem = pageItem;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	
}
