package ssm.Filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import ssm.entity.User;

@WebFilter(filterName = "SSMFilter", urlPatterns = { "/filter/*" })
public class SSMFilter implements Filter {

	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("接受调查");
		HttpServletRequest req =  (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpSession session = req.getSession();
		User user = (User) session.getAttribute("user");

		if(user == null) {
			System.out.println("未登录");
			resp.sendRedirect("/supermarketSSM/login.do");
		}else {
			System.out.println("filter"+user.getJiaoseid()+"::"+user.toString());
			if(user.getJiaoseid() != 4) {
				System.out.println("为普通用户");
				resp.sendRedirect("/supermarketSSM/shop.html");
			}else {
				System.out.println("为管理用户");
				chain.doFilter(request, response);
			}
		} 
		
		
		
		
		
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		System.out.println("SSMFilter init");
	}

}
