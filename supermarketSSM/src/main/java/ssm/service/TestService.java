package ssm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ssm.entity.User;
import ssm.mapper.TestMapper;

@Service
public class TestService {
	@Autowired
	private TestMapper map;
	@Transactional
	public int test(User user) {
		int i = map.testR(user);
		System.out.println(1/0);
		int i2 = map.testR(user);
		return i;
	}
	
	
}
