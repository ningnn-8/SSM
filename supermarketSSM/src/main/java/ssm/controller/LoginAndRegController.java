package ssm.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import ssm.entity.User;
import ssm.service.LoginAndRegService;

@Controller
public class LoginAndRegController {
	@Autowired
	private LoginAndRegService si;
	//程序入口
	@RequestMapping("/login.do")
	public String login() {
		return "/login.html";
	}
	//点击登录
	@RequestMapping(value="/goLogin.do")
	@ResponseBody
	public String goLogin(User user,HttpServletRequest req,HttpServletResponse resp) {
		System.out.println(user.toString()+"想要登录");
		User loginUser = si.login(user);
		System.out.println("登录查询的user"+loginUser);
		if(loginUser.getJiaoseid() != 0) {
			HttpSession session = req.getSession();
			session.setAttribute("user", loginUser);
		}
		String str = JSON.toJSONString(loginUser);
		return str;
	}
	//登录后得到用户信息
	@RequestMapping("/getUserMsg.do")
	@ResponseBody
	public String getUserMsg(HttpSession session) {
		
//		User user2 = new User();
//		user2.setUsername("admin");
//		user2.setPassword("123456");
//		user2.setUid("c9510ff8-4512-11eb-8817-40b03452ffe1");
//		user2.setJiaoseid(4);
//		session.setAttribute("user", user2); 
		System.out.println("getUserMsg.do竟在我身边");
		User user = (User) session.getAttribute("user");
		String strJ = JSON.toJSONString(user);
		System.out.println(strJ);
		return strJ;
	}
	//注册账号
	@RequestMapping("/goRegister.do")
	@ResponseBody
	public String goRegister(User user) {
		System.out.println(user+"想要加入大鸟转转转酒吧");
		User regUser = si.register(user);
		System.out.println("注册业务完成后返回的user"+regUser);
		if(regUser.getUid() == null) {
			return JSON.toJSONString("注册失败 用户名或电话号码已存在");
		}
		String strJ = JSON.toJSONString("注册成功！");
		return strJ;
	}
	//登出
	@RequestMapping(value="logout.do")
	@ResponseBody
	public String logout(HttpSession session) {
		session.invalidate();
		return JSON.toJSONString("登出成功！");
	}
	//查看电话号码是否存在
	@RequestMapping(value="checkPhone.do")
	@ResponseBody
	public String checkPhone(String phone) {
		System.out.println("嘟嘟"+phone);
		int i = si.checkPhone(phone);
		return i+"";
	}
	//通过电话号码修改密码
		@RequestMapping(value="changePassword.do")
		@ResponseBody
		public String changePassword(String phone,String password) {
			System.out.println("嘟嘟"+phone+"::"+password);
			User user = new User();
			user.setPassword(password);
			user.setPhone(phone);
			si.changePassword(user);
			return "已设定新密码";
		}
}

