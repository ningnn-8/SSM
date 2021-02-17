package ssm.mapper;

import java.util.List;

import ssm.entity.City;
import ssm.entity.User;

public interface LoginAndRegMapper {

	User findUserByNameAndPwd(User user);

	void register(User user);

	int checkUser(User user);

	int checkUserByPhone(String phone);

	void changePasswordByPhone(User user);

}
