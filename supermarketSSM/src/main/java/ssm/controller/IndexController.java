package ssm.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;

import ssm.entity.Goods;
import ssm.entity.GoodsChange;
import ssm.entity.Order;
import ssm.entity.Page;
import ssm.entity.User;
import ssm.entity.UserChange;
import ssm.service.GuanLiService;

@Controller
public class IndexController {
	@Autowired
	private GuanLiService si;

	// 商品表格
	@RequestMapping(value = "showGoods.do")
	@ResponseBody
	public String showGoods(Page page) {
		System.out.println("得到的分页信息：" + page.toString());
		// 得到商品信息和分页信息
		HashMap map = si.showGoods(page);
		String mapJ = JSON.toJSONString(map);
		System.out.println(mapJ);
		return mapJ;
	}

	// 添加商品
	@RequestMapping(path = "addGoods.do", method = {RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public String addGoods(HttpServletRequest request, @RequestParam("upload_file")
    MultipartFile upfile,@RequestParam("goods") String goodsJ) throws Exception {
		System.out.println("得到的商品信息：" + goodsJ);
		Goods goods = JSON.parseObject(goodsJ, Goods.class);
		String coverName=upfile.getOriginalFilename();
		goods.setCover(coverName);
		// 查看商品是否存在
		Goods checkGoods = si.checkGoods(goods);
		if (checkGoods != null) {
			return JSON.toJSONString("商品已存在");
		}
		// 商品不存在 添加商品
		si.addGoods(goods);
		//上传封面图
		String savepath = request.getSession().getServletContext().getRealPath("/img/goodsImg/");
        System.out.println(savepath);
        //判断该路径是否存在
        File file = new File(savepath);
		//文件传输
        upfile.transferTo(new File(file,coverName));
		System.out.println("商品" + goods.getGname() + "添加成功");
		return JSON.toJSONString("商品" + goods.getGname() + "添加成功");
	}

	// 删除商品
	@RequestMapping(value = "delGoods.do")
	@ResponseBody
	public String delGoods(String goodsid) {
		si.delGoods(goodsid);
		return "商品删除成功";
	}
	// 修改商品
	@RequestMapping(value = "changeGoods.do")
	@ResponseBody
	public String changGoods(GoodsChange cg) {
		System.out.println(cg.toString());
		si.changeGoods(cg);
		return JSON.toJSONString("商品[" + cg.getcGname() + "]信息修改成功");
	}
//	
	@RequestMapping(path = "fileupload22.do", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public String upload2(HttpServletRequest request, @RequestParam("upload_file")
            MultipartFile upfile,@RequestParam("goodsid") String goodsid) throws Exception {
        System.out.println("fileupload22文件上传");
        //使用fileupload组件实现文件上传
        if (!upfile.isEmpty()) {
            System.out.println("文件非空");
            //获取上传文件的保存位置
            String savepath = request.getSession().getServletContext().getRealPath("/img/goodsImg/");
            System.out.println(savepath);
            //判断该路径是否存在
            File file = new File(savepath);
            if (!file.exists()) {
                file.mkdirs();
            }
            String coverName=upfile.getOriginalFilename();
            long size=upfile.getSize();
            System.out.println("文件名称："+coverName);
            System.out.println("文件大小："+size);
            //查看商品是否已有封面图
            Goods findGoods = si.findGoodsByID(goodsid);
            System.out.println(findGoods);
            //若已有封面图 删除封面图
            if(findGoods.getCover() != " " ) {
            	StringBuffer oldCoverPath = new StringBuffer();
            	oldCoverPath.append(savepath);
            	oldCoverPath.append(findGoods.getCover());
            	System.out.println(oldCoverPath);
            	System.out.println(oldCoverPath.toString());
                File oldCover = new File(oldCoverPath.toString());
                oldCover.delete();
                System.out.println("多余的封面图已删除");
            }
            //保存封面图文件名至数据库
            GoodsChange goodsChange = new GoodsChange();
            goodsChange.setId(goodsid);
            goodsChange.setcCover(coverName);
            si.changeGoods(goodsChange);
            //文件传输
           upfile.transferTo(new File(file,coverName));
            return "上传成功";
        } else {
            System.out.println("文件空");
            return "文件为空";
        }
    }

	// 上架商品
		@RequestMapping(value = "isSaleChange.do")
		@ResponseBody
		public String isSaleChange(String id) {
			System.out.println("isSaleChange"+id);
			String msg = si.isSaleChange(id);
			System.out.println(msg);
			return msg;
		}
		// 下架商品
		@RequestMapping(value = "isSaleChangeToNo.do")
		@ResponseBody
		public String isSaleChangeToNo(String gname) {
			si.isSaleChangeToNo(gname);

			return "下架成功";
		}
	/*-----进货-------*/
	// 得到进货信息
	@RequestMapping(value = "getOrder.do")
	@ResponseBody
	public String showDingdan(Page page) {
		System.out.println("得到的订单分页信息：" + page);
		HashMap map = si.showOrder(page);
		String mapJ = JSON.toJSONString(map);
		System.out.println(mapJ);
		return mapJ;
	}

	// 删除进货记录
	@RequestMapping(value = "delOrder.do")
	@ResponseBody
	public String delOrder(String orderId) {
		System.out.println("打算删除id为" + orderId + "这条进货记录");
		si.delOrder(orderId);
		return JSON.toJSONString("进货记录删除成功");
	}

	// 添加进货信息
	@RequestMapping(value = "addOrder.do")
	@ResponseBody
	public String addOrder(Order order) {
		System.out.println("得到的进货信息:" + order);
		si.addOrder(order);
		return "进货订单添加成功";
	}

	/*-----销售记录-----*/
	// 查看销售记录
	@RequestMapping(value = "getSale.do")
	@ResponseBody
	public String showSale(Page page) {
		System.out.println("得到是销售记录分页信息：" + page);
		HashMap map = si.showSale(page);
		String mapJ = JSON.toJSONString(map);
		return mapJ;
	}
	@RequestMapping(value = "fahuo.do")
	@ResponseBody
	public String fahuo(@Param("saleID")String saleID,@Param("code")String code) {
		System.out.println("fahuofah发货"+saleID+"::"+code);
		//更新商品库存和销量
		String msg = si.fahuo(saleID,code);
		return msg;
	}

	/*-----用户-----*/
	// 查看用户信息
	@RequestMapping(value = "getUserToIndex.do")
	@ResponseBody
	public String showUser(Page page) {
		System.out.println("得到的user表分页信息：" + page);
		HashMap map = si.showUser(page);
		String mapJ = JSON.toJSONString(map);
		return mapJ;
	}

	// 修改用户信息
	@RequestMapping(value = "changeUser.do")
	@ResponseBody
	public String changeUser(UserChange userChange) {
		System.out.println("得到的修改用户信息：" + userChange);
		si.changeUser(userChange);
		return JSON.toJSONString("修改成功");

	}

	// 删除用户
	@RequestMapping(value = "delUser.do")
	@ResponseBody
	public String delUser(String uid) {
		System.out.println("得到的删除用户信息：" + uid);
		si.delUser(uid);
		return JSON.toJSONString("删除成功");

	}
	// id查找商品
		@RequestMapping(value = "findGoods.do")
		@ResponseBody
		public String findGoods(String id) {
			System.out.println("findGoodsName:" + id);
			Goods goods = si.findGoods(id);
			System.out.println(JSON.toJSONString(goods));
			return JSON.toJSONString(goods);

		}
		//id查找user
		@RequestMapping(value = "findUserByID.do")
		@ResponseBody
		public String findUserByID(String userid) {
			System.out.println("findUserByID:" + userid);
			User user = si.findUserByID(userid);
			return JSON.toJSONString(user);
		}
}
