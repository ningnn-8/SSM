package ssm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import ssm.entity.Goods;
import ssm.entity.GoodsChange;
import ssm.entity.Order;
import ssm.entity.Page;
import ssm.entity.Sale;
import ssm.entity.SaleDetails;
import ssm.entity.User;
import ssm.entity.UserChange;
import ssm.mapper.GuanLiMapper;

@Service
public class GuanLiService {
	@Autowired
	private GuanLiMapper map;

	public HashMap<String, Object> showGoods(Page page) {
		List<Goods> list = map.getGoods(page);
		int goodsNum = map.getGoodsNum(page);
		HashMap map = new HashMap();
		map.put("list", list);
		map.put("item", goodsNum);
		return map;
	}

	public Goods checkGoods(Goods goods) {
		Goods chackGoods = new Goods();
		chackGoods = map.checkGoods(goods);
		return chackGoods;
	}

	public void addGoods(Goods goods) {
		map.addGoods(goods);
	}

	// 删除商品
	public void delGoods(String goodsid) {
		map.delGoods(goodsid);
	}

	// 修改商品
	public void changeGoods(GoodsChange cg) {
		map.changeGoods(cg);
	}

	public HashMap<String, Object> showOrder(Page page) {
		List<Order> list = map.getOrder(page);
		int orderNum = map.getOrderNum(page);
		HashMap map = new HashMap();
		map.put("list", list);
		map.put("item", orderNum);
		return map;
	}

	public void delOrder(String id) {
		map.delOrder(id);
	}

	public void addOrder(Order order) {
		// 查看进货商品是否存在
		Goods goods = new Goods();
		goods.setGname(order.getoname());
		Goods checkGoods = map.checkGoods(goods);

		if (checkGoods != null) {
			// 已有此商品 增加库存
			System.out.println("商品" + order.getoname() + "已存在");
			int newStock = checkGoods.getStock() + order.getNum();
			System.out.println("新库存为" + newStock);
			GoodsChange goodsChange = new GoodsChange();
			goodsChange.setId(checkGoods.getId());
			goodsChange.setcStock(newStock);
			System.out.println(goodsChange);
			map.changeGoods(goodsChange);
			// 添加进货信息
			map.addOrder(order);
		} else {
			System.out.println("商品" + order.getoname() + "不存在");
			// 没有商品 进行添加
			goods.setStock(order.getNum());
			map.addGoods(goods);
			// 添加进货信息
			map.addOrder(order);
		}
	}

	public HashMap showSale(Page page) {
		List<Sale> list = map.getSale(page);
		int saleNum = map.getSaleNum(page);
		HashMap map = new HashMap();
		map.put("list", list);
		map.put("item", saleNum);
		return map;
	}

	public HashMap showUser(Page page) {
		List<User> list = map.getUser(page);
		int userNum = map.getUserNum(page);
		HashMap map = new HashMap();
		map.put("list", list);
		map.put("item", userNum);
		return map;
	}

	public void changeUser(UserChange userChange) {
		map.changeUser(userChange);
	}

	public void delUser(String uid) {
		map.delUser(uid);
	}

	public Goods findGoods(String goodsName) {
		Goods goods = map.findGoods(goodsName);
		return goods;
	}

	public String isSaleChange(String id) {

		Goods checkGoods = map.checkGoodsByID(id);
		System.out.println(checkGoods);
		if (checkGoods.getCover().equals("")) {
			System.out.println("少了封面图");
			return "no";
		} else if (checkGoods.getPrice() == 0 ) {
			System.out.println("少了价格");
			return "no";
		} else if (checkGoods.getTag().equals("")) {
			System.out.println("少了商品板块");
			return "no";
		} else if (checkGoods.getExpatiate().equals("")) {
			System.out.println("少了商品描述");
			return "no";
		}else {
			//商品信息完整
			map.setIsSaleYes(id);
			return "yes";
		}
		
		
	}

	public void isSaleChangeToNo(String gname) {
		map.setIsSaleNo(gname);
	}
	//发货更新商品库存和销量
	@Transactional
	public String fahuo(String saleID, String code) {
		//拿到订单详情
		List<SaleDetails> list = map.findSaleDetails(saleID);
		List goodsList = new ArrayList();
		//更新商品信息（销量和库存
		for(int i = 0;i<list.size();i++) {
			SaleDetails saleDetails = list.get(i);
			GoodsChange gc = new GoodsChange();
			//找到商品信息
			Goods findGoods = map.findGoods(saleDetails.getGoodsID());
			int newStock = findGoods.getStock() - saleDetails.getBuyNum();
			if(newStock < 0) {
				//手动回滚
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
				return "商品["+findGoods+"]库存不足 请先去补货";
			}
			int newSale = findGoods.getSale() + saleDetails.getBuyNum();
			gc.setcSale(newSale);
			gc.setcStock(newStock);
			gc.setId(saleDetails.getGoodsID());
			System.out.println("发货改商品"+gc.toString());
			map.changeGoods(gc);
		}
		//更新订单的快递信息
		map.setCode(saleID,code);
		return "发货完成";
	}

	public User findUserByID(String userid) {
		User user = map.findUserByID(userid);
		return user;
	}

	public Goods findGoodsByID(String goodsid) {
		Goods goods = map.findGoodsByID(goodsid);
		return goods;
	}
}
