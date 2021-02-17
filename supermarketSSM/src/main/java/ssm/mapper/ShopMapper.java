package ssm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import ssm.entity.Address;
import ssm.entity.Goods;
import ssm.entity.GoodsChange;
import ssm.entity.Page;
import ssm.entity.Sale;
import ssm.entity.SaleDetails;
import ssm.entity.Shopcar;
import ssm.entity.ShopcarShow;

public interface ShopMapper {

	List<Goods> getSaleGoods(String tag);

	void buyGoods(Sale sale);

	Shopcar checkShopcar(Shopcar shopcar);

	void updateShopcarNum(Shopcar shopcar);

	void addShopcar(Shopcar shopcar);

	List getShopcar(String name);

	int getShopcarNum(String name);

	void delShopcar(Shopcar shopcar);

	List<Goods> getUserSale(Page page);

	int getUserSaleNum(Page page);

	void updateGoods(GoodsChange goodsChange);

	Goods findGoods(String goodsID);

	int checkAddressNum(Address address);

	void addAddress(Address address);

	List getAddress(String userName);

	List getgetSaleGoods(String tag);

	List getAddressByID(String addressID);

	void addSale(Sale sale);

	ShopcarShow findChooseShopcar(@Param("userid")String uid, @Param("goodsid")String goodsid);
	//批量添加订单详细
	void addSaleDetails(List<SaleDetails> list);
	//删除购物车信息
	void delShopcarToList(@Param("userid")String uid, @Param("list")List<Shopcar> shopcarList);

	List getUserSaleByID(@Param("userid")String id, @Param("tiaojian")String tiaojian);

	List getSaleDetailsBySaleID(String saleID);

	List getGoodsBygoodsIDList(List<String> goodsidList);

	void delSaleDetails(String saleID);

	void delSale(String saleID);

	List getaddressByaddressIDList(List<String> addressIDList);

	void saveSale(String saleID);

	void delAddress(String addressID);


}
