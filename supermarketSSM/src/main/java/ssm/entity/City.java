package ssm.entity;

public class City {
	private String id;
	private String name;
	@Override
	public String toString() {
		return "City [id=" + id + ", name=" + name + "]";
	}
	public City(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	

}
