package ssm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ssm.entity.User;
import ssm.mapper.LoginAndRegMapper;

@Service
public class LoginAndRegService {
	@Autowired
	private LoginAndRegMapper map;

	public User login(User user) {
		User loginUser;
		loginUser = map.findUserByNameAndPwd(user);
		return loginUser;
	}

	public User register(User user) {
		//查看用户是否已存在
		int checkUser = map.checkUser(user);
		if(checkUser == 0) {
			//用户名不存在
			map.register(user);
			return user;
		}
		//用户名已存在 返回一个空的对象
		return new User();
		
	}

	public int checkPhone(String phone) {
		int i = map.checkUserByPhone(phone);
		return i;
	}

	public void changePassword(User user) {
		map.changePasswordByPhone(user);
	}

}
