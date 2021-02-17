$(document).ready(
    function() {

        //登录
        //用户名验证正则
        var userFormat = /^[a-zA-Z0-9_-]{4,16}$/;
        _userNameFlag = false;
        $('#name').bind('input propertychange click', function() {
            temp = $('#name').val()
            if (!userFormat.test(temp)) {
                $("#loginMsg").html("请输入4-16位数用户名")
                _userNameFlag = false
            } else {
                $("#loginMsg").html("")
                _userNameFlag = true
            }
            console.log("name flag:" + _userNameFlag)
        })

        //密码验证正则
        var pwdFormat = /^.{6,}$/;
        _pwdFlag = false;
        $('#pwd').bind('input propertychange click', function() {
                str = $('#pwd').val()
                if (!pwdFormat.test(str)) {
                    $("#loginMsg").html("请输入6位数以上密码")
                    _pwdFlag = false
                } else {
                    $("#loginMsg").html("")
                    _pwdFlag = true
                }
                console.log("pwd flag:" + _pwdFlag)
            })
            //注册信息验证
            //用户名
        var userFormat = /^[a-zA-Z0-9_-]{4,16}$/;
        _userNameFlag = false;
        $('#regName').bind('input propertychange click', function() {
                temp = $('#regName').val()
                if (!userFormat.test(temp)) {
                    $("#RegMsg").html("请输入4-16位数用户名")
                    _userNameFlag = false
                } else {
                    $("#RegMsg").html("")
                    _userNameFlag = true
                }
                console.log("name flag:" + _userNameFlag)
            })
            //电话号码验证正则
        var phoneFormat = /^[1]([3-9])[0-9]{9}$/;
        _phoneFlag = false;
        $('#regPhone').bind('input propertychange click', function() {
                temp = $('#regPhone').val()
                if (!phoneFormat.test(temp)) {
                    $("#RegMsg").html("请输入正确的电话号码")
                    _phoneFlag = false
                } else {
                    $("#RegMsg").html("")
                    _phoneFlag = true
                }
                console.log("phone flag:" + _phoneFlag)
            })
            //密码验证正则
        var pwdFormat = /^.{6,}$/;
        _pwdFlag = false;
        $('#regPwd').bind('input propertychange click', function() {
                str = $('#regPwd').val()
                if (!pwdFormat.test(str)) {
                    $("#RegMsg").html("请输入6位数以上密码")
                    _pwdFlag = false
                } else {
                    $("#RegMsg").html("")
                    _pwdFlag = true
                }
                console.log("pwd flag:" + _pwdFlag)
            })
            //重复密码验证
        var pwdFormat = /^.{6,}$/;
        _pwdaFlag = false;
        $('#regPwdAgain').bind('input propertychange click', function() {
            str = $('#regPwdAgain').val()
            if (!pwdFormat.test(str)) {
                $("#RegMsg").html("请输入6位数以上重复密码")
                _pwdaFlag = false
            } else if (str != $('#regPwd').val()) {
                $("#RegMsg").html("两次密码不一致")
                _pwdaFlag = false
            } else {
                $("#RegMsg").html("")
                _pwdaFlag = true
            }
            console.log("pwdAgain flag:" + _pwdaFlag)
        })


        //找回密码验证
        //电话号码验证正则
        _findPwdPhoneFlag = false;
        $('#findPwdPhone').bind('input propertychange click', function() {
                temp = $('#findPwdPhone').val()
                if (!phoneFormat.test(temp)) {
                    $("#Msg").html("请输入正确的电话号码")
                    _findPwdPhoneFlag = false
                } else {
                    $("#Msg").html("")
                    _findPwdPhoneFlag = true
                }
                console.log("phone flag:" + _findPwdPhoneFlag)
            })
            //密码验证正则
        _findPwdPasswordFlag = false;
        $('#findPwdPassword').bind('input propertychange click', function() {
                str = $('#findPwdPassword').val()
                if (!pwdFormat.test(str)) {
                    $("#Msg").html("请输入6位数以上密码")
                    _findPwdPasswordFlag = false
                } else {
                    $("#Msg").html("")
                    _findPwdPasswordFlag = true
                }
                console.log("pwd flag:" + _findPwdPasswordFlag)
            })
            //重复密码验证
        _findPwdPasswordAgainFlag = false;
        $('#findPwdPasswordAgain').bind('input propertychange click', function() {
            str = $('#findPwdPasswordAgain').val()
            if (!pwdFormat.test(str)) {
                $("#Msg").html("请输入6位数以上重复密码")
                _findPwdPasswordAgainFlag = false
            } else if (str != $('#findPwdPassword').val()) {
                $("#Msg").html("两次密码不一致")
                _findPwdPasswordAgainFlag = false
            } else {
                $("#Msg").html("")
                _findPwdPasswordAgainFlag = true
            }
            console.log("pwdAgain flag:" + _findPwdPasswordAgainFlag)
        })

    }
)



$("#goLogin").click(
    function() {
        console.log("到达此岸")
        console.log(_pwdFlag + "::" + _userNameFlag)
        if ((_pwdFlag == true) && (_userNameFlag == true)) {

            login()
        } else {
            alert("登录信息不完全 无法登录")
        }
    }
)

function login() {
    user = {
        //要和java里的一样
        username: $("input[id='name']").val(),
        password: $("input[id='pwd']").val()
    }
    console.log(user)
    $.ajax({
        url: "/supermarketSSM/goLogin.do",
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function(data) {
            console.log(data.jiaoseid + "角色id")
            if (data.jiaoseid == 1) { //普通用户
                window.location.href = 'http://localhost:8080/supermarketSSM/shop.html';
            } else {
                window.location.href = 'http://localhost:8080/supermarketSSM/filter/index.html';
            }

        },
        error: function() {
            alert("登录失败");
        }
    });
}
//点击注册 清理输入框内容
$('#modal-41376').click(function() {
    $('#regName,#regPhone,#regPwd,#regPwdAgain').val(null)
})


$("#goReg").click(function() {
    if (_userNameFlag == _pwdaFlag == _phoneFlag == true) {

        register()
    } else {
        alert("注册信息不完全或错误 无法注册")
    }
})

function register() {
    user = {
        //要和java里的一样
        username: $("#regName").val(),
        phone: $("#regPhone").val(),
        password: $("#regPwd").val()
    }
    console.log(user)
    $.ajax({
        url: "/supermarketSSM/goRegister.do",
        data: user,
        type: "POST",
        success: function(data) {
            alert(data)
        },
        error: function() {
            alert("注册失败 系统错误！！！");
        }
    });
}


//找回密码
//点击 找回密码？
$('#modal-765').click(function() {
    console.log("点草你哦吗")
    $('Msg').text(" ")
    $('#checkPhone').css('display', 'block');
    $('#phoneYes').css('display', 'none');
    $('#goFindPwd').css('display', 'none');
})

//查看电话号码
$('#checkPhone').click(function() {
        if (_findPwdPhoneFlag == false) {
            alert("电话号码错误")
        } else {
            phone = $('#findPwdPhone').val()
            console.log(phone)
            $.ajax({
                url: "/supermarketSSM/checkPhone.do",
                data: {
                    phone
                },
                type: "POST",
                success: function(data) {
                    if (data == 0) {
                        alert("该号码未注册账号")
                    } else {
                        $('#checkPhone').css('display', 'none');
                        $('#phoneYes').css('display', 'block');
                        $('#goFindPwd').css('display', 'block');
                    }
                },
                error: function() {
                    alert("注册失败 系统错误！！！");
                }
            });
        }

    })
    //前往找回密码
$('#goFindPwd').click(function() {
    if (_findPwdPhoneFlag == _findPwdPasswordAgainFlag == false) {
        alert("密码不一致或为符合要求")
    } else {
        phone = $('#findPwdPhone').val()
        password = $('#findPwdPassword').val()
        console.log(phone)
        $.ajax({
            url: "/supermarketSSM/changePassword.do",
            data: {
                phone,
                password
            },
            type: "POST",
            success: function(data) {
                alert(data)
            },
            error: function() {
                alert("注册失败 系统错误！！！");
            }
        });
    }

})