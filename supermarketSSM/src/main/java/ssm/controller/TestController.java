package ssm.controller;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;

import ssm.entity.City;
import ssm.entity.Goods;
import ssm.entity.User;
import ssm.service.GuanLiService;
import ssm.service.LoginAndRegService;
import ssm.service.TestService;

//MVC的注解：容器会将带有@Controller注解的类注册成为MVC容器的组件
@Controller
public class TestController {
	
	@Autowired
	private TestService si;
	//测试mybatis update返回值
	@RequestMapping(value="/test")
	@ResponseBody
	public String test() {
		System.out.println("行不行到是给句话啊");
		return "mamamiyamam草33";
	}
//	@RequestMapping(path = "fileupload2", method = {RequestMethod.POST, RequestMethod.GET})
//    @ResponseBody
//    public String upload2(HttpServletRequest request, @RequestParam("upload_file")
//            MultipartFile upfile,@RequestParam("goodsName") String str) throws Exception {
//        System.out.println("upload文件上传");
//        System.out.println(str);
//        //使用fileupload组件实现文件上传
//        if (!upfile.isEmpty()) {
//            System.out.println("文件非空");
//            //获取上传文件的保存位置
//            String savepath = request.getSession().getServletContext().getRealPath("/img/goodsImg/");
//            System.out.println(savepath);
//            //判断该路径是否存在
//            File file = new File(savepath);
//            if (!file.exists()) {
//                file.mkdirs();
//            }
//            String oldname=upfile.getOriginalFilename();
//            long size=upfile.getSize();
//            System.out.println("文件名称："+oldname);
//            System.out.println("文件大小："+size);
//            //文件传输
//           upfile.transferTo(new File(file,oldname));
//            return "success";
//        } else {
//            System.out.println("文件空");
//            return "success";
//        }
//    }
}
