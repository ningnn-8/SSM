function getValue() {

    // var userName = document.getElementById("userName").value;
    // var pwd = document.getElementById("password").value;
    // var pwdSure = document.getElementById("passwordSure").value;
    // console.log(userName + pwd + pwdSure);
    // var user = { "name": userName, "password": pwd }
    $.ajax({
        url: "/jiaofeiWEB/register",
        type: "POST",
        success: function(data) {
            alert(data)
        },
        error: function() {
            alert("服务器繁忙，请稍后访问")
        }
    })

}

function checkForm() {
    alert("来到了checkform！！")
    var flag = true;
    var userMsg = document.getElementById("userMsg");
    var userName = document.getElementById("userName").value;
    if (userName == "") {
        userMsg.innerHTML = "不能为空";
        flag = false;
    }
    var userFormat = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!userFormat.test(userName)) {
        userMsg.innerHTML = "请输入4-16位数用户名";
        flag = false;
    }
    var pwdMsg = document.getElementById("pwdMsg");
    var pwd = document.getElementById("password").value;
    if (pwd == "") {
        pwdMsg.innerHTML = "不能为空";
        flag = false;
    }
    var pwdFormat = /^.{6,}$/;
    if (!pwdFormat.test(pwd)) {
        pwdMsg.innerHTML = "密码至少6位";
        flag = false;
    }
    var pwdSureMsg = document.getElementById("pwdSureMsg");
    var pwdSure = document.getElementById("passwordSure").value;
    if (pwdSure == "") {
        pwdSureMsg.innerHTML = "不能为空";
        flag = false;
    }
    if (pwd != pwdSure) {
        pwdSureMsg.innerHTML = "两次密码不一致";
        flag = false;
    }
    var mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var mailMsg = document.getElementById("mailMsg");
    var mail = document.getElementById("mail").value;
    if (mail == "") {
        mailMsg.innerHTML = "不能为空";
        flag = false;
    }
    if (!mailFormat.test(mail)) {
        mailMsg.innerHTML = "输入错误";
        flag = false;
    }
    var phoneFormat = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{9}$/;
    var phoneMsg = document.getElementById("phoneMsg");
    var phone = document.getElementById("phone").value;
    if (phone == "") {
        phoneMsg.innerHTML = "不能为空";
        flag = false;
    }
    if (!phoneFormat.test(phone)) {
        phoneMsg.innerHTML = "输入错误";
        flag = false;
    }
    return flag;
}