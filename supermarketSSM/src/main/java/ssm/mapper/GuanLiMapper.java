package ssm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import ssm.entity.Goods;
import ssm.entity.GoodsChange;
import ssm.entity.Order;
import ssm.entity.Page;
import ssm.entity.Sale;
import ssm.entity.User;
import ssm.entity.UserChange;

public interface GuanLiMapper {
	//得到商品信息
	List<Goods> getGoods(Page page);
	//得到商品总数
	int getGoodsNum(Page page);
	//查看商品是否存在
	Goods checkGoods(Goods goods);
	//查看商品是否存在
	Goods checkGoodsByID(String id);
	//添加商品
	void addGoods(Goods goods);
	//删除商品
	void delGoods(String gname);
	//修改商品
	void changeGoods(GoodsChange cg);
	
	//得到进货信息
	List<Order> getOrder(Page page);
	//得到进货信息总数
	int getOrderNum(Page page);
	//删除进货信息
	void delOrder(String id);
	//添加进货信息
	void addOrder(Order order);
	
	//得到销售记录信息
	List<Sale> getSale(Page page);
	//得到销售记录信息数
	int getSaleNum(Page page);
	
	//得到用户信息
	List<User> getUser(Page page);
	int getUserNum(Page page);
	//修改用户
	void changeUser(UserChange userChange);
	//删除用户
	void delUser(String uid);
	//找一个商品
	Goods findGoods(String goodsName);
	//修改商品上架为是
	void setIsSaleYes(String gname);
	
	void setIsSaleNo(String gname);
	
	List findSaleDetails(String saleID);
	
	void setCode(@Param("saleID")String saleID, @Param("code")String code);
	
	User findUserByID(String userid);
	Goods findGoodsByID(String goodsid);
	
}
