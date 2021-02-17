package ssm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ssm.entity.Address;
import ssm.entity.Goods;
import ssm.entity.GoodsChange;
import ssm.entity.Page;
import ssm.entity.Sale;
import ssm.entity.SaleDetails;
import ssm.entity.Shopcar;
import ssm.entity.ShopcarShow;
import ssm.mapper.ShopMapper;

@Service
public class ShopSerivce {
	@Autowired
	private ShopMapper map;


	@Transactional
	public void justBuy(SaleDetails saleDetails,String addressID,String userID) {
		//添加订单并返回订单id
		Sale sale = new Sale();
		sale.setAddressID(addressID);
		sale.setUserID(userID);
		map.addSale(sale);
		//将返回的saleid存入saleDetails
		saleDetails.setSaleID(sale.getId());
		List<SaleDetails> list = new ArrayList();
		list.add(saleDetails);
		map.addSaleDetails(list);
	}

	//购物车购买
	@Transactional
	public void shopcarBuy(List<SaleDetails> list, String addressID, String uid) {
				//添加订单并返回订单id
				Sale sale = new Sale();
				sale.setAddressID(addressID);
				sale.setUserID(uid);
				map.addSale(sale);
				//将saleID装进list 组装shopcarList
				List<SaleDetails> newList = new ArrayList();
				List<Shopcar> shopcarList = new ArrayList();
				for(int i = 0;i<list.size();i++) {
					SaleDetails saleDetails = list.get(i);
					saleDetails.setSaleID(sale.getId());
					newList.add(saleDetails);
					
					Shopcar shopcar = new Shopcar();
					shopcar.setGoodsid(saleDetails.getGoodsID());
					shopcar.setUserid(uid);
					shopcarList.add(shopcar);
				}
				System.out.println("kksk//"+newList);
				//批量添加订单详情
				map.addSaleDetails(newList);
				//删除购物车信息
				map.delShopcarToList(uid,shopcarList);
//				}
	}
	
	public void addShopcar(Shopcar shopcar) {
		// 查看购物车是否已有商品
		Shopcar c = map.checkShopcar(shopcar);
		if (c == null) {
			map.addShopcar(shopcar);
		} else {
			// 增加数量
			int newNum = c.getGoodsNum() + shopcar.getGoodsNum();
			shopcar.setGoodsNum(newNum);
			map.updateShopcarNum(shopcar);
		}
	}

	public List getShopcar(String name) {
		List list = map.getShopcar(name);
		return list;

	}

	public void delShopcar(Shopcar shopcar) {
		map.delShopcar(shopcar);
	}

	//得到用户购买记录数据
	public HashMap getUserSale(Page page) {
		List<Goods> list = map.getUserSale(page);
		int item = map.getUserSaleNum(page);
		HashMap map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("item", item);
		return map;
	}
	//查看用户收货地址数量
	public int checkAddressNum(Address address) {
		int num = map.checkAddressNum(address);
		return num;
	}
	//添加用户收货地址
	public void addAddress(Address address) {
		map.addAddress(address);
	}
	public List getUserAddress(String userid) {
		List list = map.getAddress(userid);
		return list;
	}
	public List getSaleGoods(String tag) {
		List list = map.getSaleGoods(tag);
		return list;
	}
	public List getAddressByID(String addressID) {
		List list = map.getAddressByID(addressID);
		return list;
	}

	public Goods getOneGoodsByID(String goodsID) {
		Goods findGoods = map.findGoods(goodsID);
		return findGoods;
	}

	public List findChooseShopcar(String uid, List<String> goodsIDList) {
		List<ShopcarShow> ShopcarShowList = new ArrayList();
		for(int i = 0;i<goodsIDList.size();i++) {
			String goodsid = goodsIDList.get(i);
			ShopcarShow findChooseShopcar = map.findChooseShopcar(uid,goodsid);
		}
		return ShopcarShowList;
	}

	public List getUserSaleByID(String id, String tiaojian) {
		List list = map.getUserSaleByID(id,tiaojian);
		return list;
	}

	public List getSaleDetailsBySaleID(String saleID) {
		List list = map.getSaleDetailsBySaleID(saleID);
		return list;
	}

	public List getGoodsBygoodsIDList(List<String> goodsidList) {
		List list = map.getGoodsBygoodsIDList(goodsidList);
		return list;
	}

	public void delSale(String saleID) {
		//先删除订单详情
		map.delSaleDetails(saleID);
		//删除订单
		map.delSale(saleID);
	}

	public List getaddressByaddressIDList(List<String> addressIDList) {
		List list = map.getaddressByaddressIDList(addressIDList);
		return list;
	}

	public void saveSale(String saleID) {
		map.saveSale(saleID);
	}

	public void delAddress(String addressID) {
		map.delAddress(addressID);
	}

}
