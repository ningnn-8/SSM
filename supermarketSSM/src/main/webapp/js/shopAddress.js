//点击“收货地址”
$('#checkAddress').click(function() {
    $('#modal-container-900').find('button[id^="addAddress"]').css("display", "block")
    UserCheckAddress()
})

function UserCheckAddress() {
    $.ajax({
        url: "/supermarketSSM/getUserAddress.do",
        type: "post",
        dataType: "json",
        success: function(data) {
            $("#userAddress  tr:not(:first)").html("");
            console.log(data)
            $.each(data, function(index, obj) {
                address = '<address><strong style="font-size: 23px;">' + obj.addressName + '</strong><strong style="font-size: 18px; color: #5e5e5e;">' + obj.phone + '</strong>' +
                    '<br/>' + obj.area + '<br/>' + obj.address + '</address>'
                bianji = '<button value="' + obj.addressID + '" onclick="delAddress(this)">删除</button>'
                td = '<td>' + (index + 1) + '</td>' +
                    '<td>' + address + '</td>' +
                    '<td>' + obj.tag + '</td>' +
                    '<td>' + bianji + '</td>'
                tr = '<tr>' + td + '</tr>'
                $('#userAddress').append(tr)

            })
        },
        error: function() {
            alert("获取收货地址信息失败")
        }
    })
}

//删除地址

function delAddress(obj) {
    console.log($(obj).val())
    if (confirm("确定要删除这条地址信息吗？")) {
        $.ajax({
            url: "/supermarketSSM/delAddress.do",
            type: "post",
            data: { addressID: $(obj).val() },
            success: function(data) {
                alert(data)
                UserCheckAddress()
            }
        })
    }
}

//地址信息验证
//收货人姓名
// var userFormat = /^(?=.*?[\u4E00-\u9FA5]){2,6}/;
// $('#addressMan').bind('input propertychange click', function() {
//         name = $('#addressMan').val()
//         if (!userFormat.test(name)) {
//             $("#msg").html("请输入收货人姓名")
//             _addressManFlag = false
//         } else {
//             $("#msg").html("")
//             _addressManFlag = true
//         }
//         console.log("收货人 flag:" + _addressManFlag)
//     })
//     //电话号码
// var userFormat = /^[1]([3-9])[0-9]{9}$/;
// $('#addressPhone').bind('input propertychange click', function() {
//         name = $('#addressPhone').val()
//         if (!userFormat.test(name)) {
//             $("#msg").html("请输入正确的电话号码")
//             _addressPhoneFlag = false
//         } else {
//             $("#msg").html("")
//             _addressPhoneFlag = true
//         }
//         console.log("电话 flag:" + _addressPhoneFlag)
//     })
//     //详细地址
// var userFormat = /^(?=.*?[\u4E00-\u9FA5])[a-zA-Z0-9\-\_\u4E00-\u9FA5]{5,100}/;
// $('#addressAddress').bind('input propertychange click', function() {
//         name = $('#addressAddress').val()
//         if (!userFormat.test(name)) {
//             $("#msg").html("请输入详细地址 至少5位")
//             _addressAddressFlag = false
//         } else {
//             $("#msg").html("")
//             _addressAddressFlag = true
//         }
//         console.log("详细地址 flag:" + _addressAddressFlag)
//     })
//地址信息提交
$('#ok').click(
        function() {
            var address = {}
            address.addressName = $('#addressMan').val()
            address.phone = $('#addressPhone').val()
            if ($('.area-input-name').length > 0) {
                address.area = $('.area-input-name').text()
            } else {
                console.log('请先选择地区')
            }
            address.address = $('#addressAddress').val()
            address.tag = $("input[name='tag']:checked").val()
            address.userName = getUserMsg()
            console.log(address)
            $.ajax({
                url: "/supermarketSSM/addAddress.do",
                type: "post",
                data: address,
                success: function(data) {
                    alert(data)
                    UserCheckAddress()
                },
                error: function() {
                    alert("收货地址添加失败")
                }
            })
        })
    //点击添加地址 清空里面的内容
$('#addAddress').click(function() {
        $('#goChangeAddress').css("display", "none")
        $('#ok').css("display", "block")
        $('#addressMan').val("")
        $('#addressPhone').val("")
        $('#addressAddress').val("")
        $('.area-header-click-input').html('<span class="placeholder">请选择省/市/区/街道</span>')
        $("input[name='tag']").prop("checked", false);
    })
    /*地址插件*/
    /* 添加事件监听函数
     * obj 要添加监听的对象或元素 
     * eventName 事件名 
     * fun 监听函数的名称 
     * param 给监听函数传的参数， 这里就传了一个参数 
     */
function addEventHandler(obj, eventName, fun, param) {
    var fn = fun;
    if (param != undefined) {
        fn = function(e) {
            fun.call(this, param); //继承监听函数,并传入参数以初始化;
        }
    }
    if (obj.attachEvent) {
        obj.attachEvent('on' + eventName, fn);
    } else if (obj.addEventListener) {
        obj.addEventListener(eventName, fn, false);
    } else {
        obj["on" + eventName] = fn;
    }
}
/* 
 *  采用事件监听给对象绑定方法后，可以解除相应的绑定 
 *  oTarget：监听对象 
 *  sEventType：监听事件类型，如click,mouseover 
 *  fnHandler：监听函数 
 */
function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        //监听IE9，谷歌和火狐  
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        delete oTarget["on" + sEventType];
    }
}
/*
 * 停止冒泡行为
 */
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器 
    if (e && e.stopPropagation)
    //因此它支持W3C的stopPropagation()方法 
        e.stopPropagation();
    else
    //否则，我们需要使用IE的方式来取消事件冒泡 
        window.event.cancelBubble = true;
}

var area_entrance = document.getElementById('area-entrance');
var area_header = area_entrance.getElementsByClassName('area-header')[0];
var area_header_tips = area_entrance.getElementsByClassName('area-header-tips')[0];
var area_header_click = area_entrance.getElementsByClassName('area-header-click')[0];
var area_header_click_input = area_entrance.getElementsByClassName('area-header-click-input')[0];
var area_box = area_entrance.getElementsByClassName('area-box')[0];
var area_box_title = area_entrance.getElementsByClassName('area-box-title')[0];
var area_box_content = area_entrance.getElementsByClassName('area-box-content');
var area_box_content_panel = area_entrance.getElementsByClassName('area-box-content-panel');
var area_box_content_list = area_entrance.getElementsByClassName('area-box-content-list');

//处理标题切换
function area_box_title_handle(e) {
    e = e || window.event;　 //IE window.event
    var t = e.target || e.srcElement; //目标对象
    //标题切换
    for (var i = 0; i < area_box_title.children[0].children.length; i++) {
        if (area_box_title.children[0].children[i] == t) {
            //把当前标题背景设置为白色
            area_box_title.children[0].children[i].classList.add('area-box-title-current');
            //显示当前列表
            area_box_content_panel[i].classList.add('area-box-content-visible');

        } else {
            //把其余标题背景设置为灰色
            area_box_title.children[0].children[i].classList.remove('area-box-title-current');
            //隐藏其余列表显示
            area_box_content_panel[i].classList.remove('area-box-content-visible');

        }
    }
}
//省级标题背景变白色
area_box_title.children[0].children[0].classList.add('area-box-title-current');
//省级标题绑定点击事件
addEventHandler(area_box_title.children[0].children[0], 'click', area_box_title_handle);
//显示省级列表
area_box_content_panel[0].classList.add('area-box-content-visible');
//获取省级节点数组
var province = getSubLevel('0');
//添加节点到展示列表
for (var i = 0; i < province.length; i++) {
    area_box_content_list[0].innerHTML += '<li code=' + province[i].code + '>' + province[i].name + '</li>';
}

//为父节点绑定省级节点点击事件，2020-01-03
addEventHandler(area_box_content_list[0], 'click', area_box_content_list_handle, 0);

//切换选择列表
function area_header_click_toggle(e) {
    e = e || window.event;　 //IE window.event
    var t = e.target || e.srcElement; //目标对象
    //切换 选择列表
    if (document.defaultView.getComputedStyle(area_box).display == 'none') {
        area_box.classList.add('area-box-content-visible');
    } else {
        area_box.classList.remove('area-box-content-visible');
    }

    //取消冒泡
    stopBubble(e);
}
//地址栏绑定点击事件
addEventHandler(area_header_click, 'click', area_header_click_toggle);
//弹出选择列表
function area_header_click_handle(e) {
    e = e || window.event;　 //IE window.event
    var t = e.target || e.srcElement; //目标对象
    //显示选择列表
    area_box.classList.add('area-box-content-visible');
    //取消冒泡
    stopBubble(e);
}
//展示列表绑定点击事件
addEventHandler(area_box, 'click', area_header_click_handle);
//关闭选择列表
function close_area_box_handle() {
    //隐藏选择列表
    area_box.classList.remove('area-box-content-visible');
}
//文档其余部分绑定点击事件
addEventHandler(document, 'click', close_area_box_handle);
//本级节点绑定点击事件
function area_box_content_list_handle(index, e) {
    e = e || window.event;　 //IE window.event
    var t = e.target || e.srcElement; //目标对象
    //点击上级节点不处理，2020-01-03
    if (t.tagName != 'LI') return;
    //获取下级行政区划
    var arrSubLevel = getSubLevel(t.getAttribute('code'));
    var fillContent;
    //当前选择节点变蓝色
    for (var i = 0; i < area_box_content_list[index].children.length; i++) {
        if (area_box_content_list[index].children[i] == t) {
            t.classList.add('area-current');
        } else {
            area_box_content_list[index].children[i].classList.remove('area-current');
        }
    }
    //清空本级及后续输入地址
    for (var i = area_header_click_input.children.length - 1; i >= index; i--) {
        area_header_click_input.children[i].outerHTML = '';
    }
    //选中地址填充到输入框
    fillContent = '<span><span class="area-input-name">' + t.innerText;
    //街道没有斜线
    if (index == 3) {
        fillContent += '</span><span class="area-input-symbol"></span></span>';
    } else {
        fillContent += '</span><span class="area-input-symbol">/</span></span>';
    }
    //暂不选择不进入输入框
    if (t.innerText == '暂不选择') {
        fillContent = '';
    }
    area_header_click_input.innerHTML += fillContent;
    //点击街道退出
    if (index == 3) {
        close_area_box_handle();
        //取消冒泡
        stopBubble(e);
        return;
    }
    //次级标题绑定点击事件
    if (area_box_title.children[0].children.length > index + 1) {
        addEventHandler(area_box_title.children[0].children[index + 1], 'click', area_box_title_handle);
    }
    //取消后续标题绑定点击事件
    for (var i = area_box_title.children[0].children.length - 1; i > index + 1; i--) {
        removeEventHandler(area_box_title.children[0].children[i], 'click', area_box_title_handle);
    }

    //标题切换至下级
    area_box_title.children[0].children[index + 1].classList.add('area-box-title-current');
    area_box_content_panel[index + 1].classList.add('area-box-content-visible');

    //隐藏本级标题
    area_box_title.children[0].children[index].classList.remove('area-box-title-current');
    area_box_content_panel[index].classList.remove('area-box-content-visible');

    //填充次级可选节点，首先清空
    area_box_content_panel[index + 1].children[0].innerHTML = '';
    if (index == 2) {
        area_box_content_panel[index + 1].children[0].innerHTML += '<li code=' + '0' + '>' + '暂不选择' + '</li>';
    }
    for (var i = 0; i < arrSubLevel.length; i++) {
        area_box_content_panel[index + 1].children[0].innerHTML += '<li code=' + arrSubLevel[i].code + '>' + arrSubLevel[i].name + '</li>';
    }

    //为父节点绑定可选节点点击事件，2020-01-03
    addEventHandler(area_box_content_panel[index + 1].children[0], 'click', area_box_content_list_handle, index + 1);
}
//根据所选地址code查找子级节点，返回数组，找不到返回undefined
function getSubLevel(code) {
    var cities, areas, streets, rValue;
    if (!code) {
        return;
    }
    //点击地址栏，返回所有节点
    if (code == '0') {
        rValue = pcas;
        return rValue;
    }
    var code2 = code.substring(0, 2);
    //点击省级节点，返回市级列表数组
    for (var i = 0; i < pcas.length; i++) {
        if (pcas[i].code == code) {
            //刚好是省级节点
            rValue = pcas[i].children;
            return rValue;
        } else if (pcas[i].code == code.substring(0, 2)) {
            //前两位是省级节点
            cities = pcas[i].children;
            break;
        }
    }
    //点击市级节点，返回区级列表数组
    if (cities) {
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].code == code) {
                rValue = cities[i].children;
                return rValue;
            } else if (cities[i].code == code.substring(0, 4)) {
                areas = cities[i].children;
                break;
            }
        }
    }
    //点击区级节点，返回街道列表数组
    if (areas) {
        for (var i = 0; i < areas.length; i++) {
            if (areas[i].code == code) {
                rValue = areas[i].children;
                return rValue;
            } else if (areas[i].code == code.substring(0, 6)) {
                streets = areas[i].children;
                break;
            }
        }
    }
    return rValue;
}