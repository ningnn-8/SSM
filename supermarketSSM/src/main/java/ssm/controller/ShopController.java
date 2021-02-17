package ssm.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ssm.entity.Address;
import ssm.entity.Goods;
import ssm.entity.Page;
import ssm.entity.Sale;
import ssm.entity.SaleDetails;
import ssm.entity.Shopcar;
import ssm.entity.User;
import ssm.service.ShopSerivce;

@Controller
public class ShopController {
	@Autowired
	private ShopSerivce si;

	// 根据tag加载商品信息
	@RequestMapping("/getBankuaiGoods.do")
	@ResponseBody
	public String getBankuaiGoods(String tag) {
		System.out.println(tag);
		List list = si.getSaleGoods(tag);
		System.out.println("getBankuaiGoods" + JSON.toJSONString(list));
		return JSON.toJSONString(list);
	}

	// 直接购买商品
	@RequestMapping(value = "/Justbuy.do", method = RequestMethod.POST)
	@ResponseBody
	public String justShop(@RequestParam("list") String userList, @RequestParam("addressID") String addressID,
			HttpSession session) throws Exception {
		// jackson对象
		ObjectMapper mapper = new ObjectMapper();
		// 使用jackson将json转为List<saleDetails>
		JavaType jt = mapper.getTypeFactory().constructParametricType(ArrayList.class, SaleDetails.class);
		List<SaleDetails> list = (List<SaleDetails>) mapper.readValue(userList, jt);
		SaleDetails saleDetails = list.get(0);
		// 得到userid
		User user = (User) session.getAttribute("user");
		String uid = user.getUid();
		// 组装saleDetails
		Goods goods = si.getOneGoodsByID(saleDetails.getGoodsID());
		saleDetails.setPrice(goods.getPrice());
		// 插入数据库
		si.justBuy(saleDetails, addressID, uid);
		return "购买成功";
	}

	// 添加购物车
	@RequestMapping("/addShopcar.do")
	@ResponseBody
	public String addShopcar(Shopcar shopcar) {
		System.out.println("添加购物车" + shopcar);
		si.addShopcar(shopcar);
		return "添加成功";
	}

	// 查看购物车
	@RequestMapping("/getShopcar.do")
	@ResponseBody
	public String getShopcar(@Param("userid") String userid) {
		System.out.println("/getShopcar.do   " + userid);
		List list = si.getShopcar(userid);
		System.out.println(list);
		return JSON.toJSONString(list);
	}

	// 删除购物车商品
	@RequestMapping("/delShopcar.do")
	@ResponseBody
	public String delShopcar(@Param("goodsid") String goodsid, HttpSession session) {
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return "账号信息缺失";
		}
		Shopcar shopcar = new Shopcar();
		shopcar.setGoodsid(goodsid);
		shopcar.setUserid(user.getUid());
		si.delShopcar(shopcar);
		return "移出成功";
	}

	// 购物车结账
	@RequestMapping(value = "/shopcarBuy.do", method = RequestMethod.POST)
	@ResponseBody
	public String shopcarBuy(@RequestParam("list") String userList, @RequestParam("addressID") String addressID,
			HttpSession session) throws Exception {
		// jackson对象
		ObjectMapper mapper = new ObjectMapper();
		// 使用jackson将json转为List<saleDetails>
		JavaType jt = mapper.getTypeFactory().constructParametricType(ArrayList.class, SaleDetails.class);
		List<SaleDetails> list = (List<SaleDetails>) mapper.readValue(userList, jt);
		System.out.println("kksk/" + list);
		// 得到userid
		User user = (User) session.getAttribute("user");
		String uid = user.getUid();
		si.shopcarBuy(list, addressID, uid);
		return JSON.toJSONString("结算成功");
	}

	// 添加收货地址
	@RequestMapping("/addAddress.do")
	@ResponseBody
	public String addAddress(Address address,HttpSession session) {
		System.out.println(address);
		// 查看该用户的地址数量
		int i = si.checkAddressNum(address);
		if (i >= 6) {
			System.out.println("地址数量已达到上限");
			return "地址数量已达到上限";
		} else {
			User user = (User) session.getAttribute("user");
			String uid = user.getUid();
			address.setUserid(uid);
			si.addAddress(address);
			System.out.println("收货地址添加成功");
			return "收货地址添加成功";
		}
	}

	// 查看地址
	@RequestMapping("/getUserAddress.do")
	@ResponseBody
	public String getUserAddress(HttpSession session) {
		User user = (User) session.getAttribute("user");
		String userid = user.getUid();
		System.out.println(userid + "想看他的收货地址");
		List list = si.getUserAddress(userid);
		System.out.println(JSON.toJSONString(list));
		return JSON.toJSONString(list);
	}
	//删除地址 delAddress
	@RequestMapping("/delAddress.do")
	@ResponseBody
	public String delAddress(String addressID) {
		System.out.println(addressID);
		si.delAddress(addressID);
		return "地址删除成功";
	}
	// id找到地址信息
	@RequestMapping("/getAddressByID.do")
	@ResponseBody
	public String getAddressByID(@Param("addressID") String addressID) {
		System.out.println("/getAddressByID.do  " + addressID);
		List list = si.getAddressByID(addressID);
		System.out.println(JSON.toJSONString(list));
		return JSON.toJSONString(list);
	}

	// id查找订单
	@RequestMapping("/getUserSale.do")
	@ResponseBody
	public String getUserSale(@Param("id")String id,@Param("str") String str) {
		System.out.println("/getUserSale.do   " + id+str);
		// 通过id得到待处理的订单
		List list = si.getUserSaleByID(id,str);
		System.out.println("/getUserSale.do   " + list);
		return JSON.toJSONString(list);
	}

	// 拿着saleID查saleDetails
	@RequestMapping("/getSaleDetailsBySaleID.do")
	@ResponseBody
	public String getSaleDetailsBySaleID(@Param("saleID") String saleID) {
		System.out.println("/getSaleDetailsBySaleID.do   " + saleID);
		List list = si.getSaleDetailsBySaleID(saleID);
		return JSON.toJSONString(list);
	}

	// 拿着goodsIDList查goods
	@RequestMapping("/getGoodsBygoodsIDList.do")
	@ResponseBody
	public String getGoodsBygoodsIDList(@RequestParam("list")List<String> goodsidList) {
		System.out.println("/getGoodsBygoodsIDList.do   " + goodsidList);
		List list = si.getGoodsBygoodsIDList(goodsidList);
		return JSON.toJSONString(list);
	}
	// 拿着addressIDList查address
		@RequestMapping("/getaddressByaddressIDList.do")
		@ResponseBody
		public String getaddressByaddressIDList(@RequestParam("list")List<String> addressIDList) {
			System.out.println("/getaddressByaddressIDList.do   " + addressIDList);
			List list = si.getaddressByaddressIDList(addressIDList);
			return JSON.toJSONString(list);
		}
	
	//删除订单
	@RequestMapping("/delSale.do")
	@ResponseBody
	public String delSale(@Param("saleID")String saleID) {
		System.out.println("/delSale.do   " + saleID);
		si.delSale(saleID);
		return JSON.toJSONString("订单"+saleID+"删除成功");
	}
	//订单收货
	@RequestMapping("/saveSale.do")
	@ResponseBody
	public String saveSale(@Param("saleID")String saleID) {
		System.out.println("/saveSale.do   " + saleID);
		si.saveSale(saleID);
		return JSON.toJSONString("订单"+saleID+"收货成功");
	}
}
