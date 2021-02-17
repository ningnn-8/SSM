$(document).ready(
    function() {
        //加载瀑布流插件
        var _name = getUserMsg()
        console.log(_name)
        _limit = 0;
        _pageItem = 100;
        //得到好哥哥超市的商品
        getBankuaiGoods('chaoshi', '好哥哥超市');
        //得到好哥哥国际的商品
        // getBankuaiGoods('guoji', '好哥哥国际');
        // //得到美丽人生的商品
        // getBankuaiGoods('meili', '美丽人生');
        // //得到潮玩酷品的商品
        // getBankuaiGoods('kuwan', '潮电酷玩');
        //得到好哥哥超市的商品
        getBankuaiGoods('yiban', '%%');
    }
)
var i = 1
    //滚动条到页面底部加载更多案例 
$(window).scroll(function() {

    var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
    var scrollHeight = $(document).height(); //当前页面的总高度
    var clientHeight = $(this).height(); //当前可视的页面高度
    // console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);

    if (scrollTop + clientHeight >= scrollHeight - 5) { //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 
        //滚动条到达底部
        getBankuaiGoods('yiban', '%%');
    } else if (scrollTop <= 0) {}

});
//得到用户信息
function getUserMsg() {
    var _userName;
    var _userid;
    $.ajax({
        url: "/supermarketSSM/getUserMsg.do",
        data: {},
        type: "POST",
        dataType: "json",
        async: false,
        success: function(data) {
            if (data == null) {
                _userName = undefined
                $('#userName').removeAttr("class data-toggle")
                $('#userName').attr("href", "/supermarketSSM/login.html")
                $("#userName").text("点我登录")
            } else {
                _userName = data.username

                console.log("getuser" + _userName)
                $("#userName").text(data.username)
                _userid = data.uid
            }
        },
        error: function() {
            console.log("得不到用户信息")
        }
    })
    return _userid
}

function getBankuaiGoods(bankuai, tag) {
    $.ajax({
        url: "/supermarketSSM/getBankuaiGoods.do",
        data: page = {
            tag: tag
        },
        type: "post",
        dataType: "json",
        async: false,
        success: function(data) {
            if (bankuai == "yiban") {

            } else {
                $("." + bankuai).find('div[class^="bankuaiBody"]').empty();
            }
            $.each(data,
                function(index, obj) {
                    //商品名
                    if (obj.gname.length > 16) { //要求字数大于10才进行字数替换
                        var gname = obj.gname.replace(/\s+/g, "").substr(0, 16) + "..."
                            //从0到10开始替换，将剩余文本内容替换为"..."
                    } else {
                        var gname = obj.gname
                    }
                    var cover = "<div class='imgBox'><img class='imgs' src='/supermarketSSM/img/goodsImg/" + obj.cover + "' alt='暂无'> </div>"
                    $("." + bankuai).find('div[class^="bankuaiBody"]').append(
                        '<div class="col-md-3">' +
                        '<div class="thumbnail" onclick="getGoodsAll(this)">' +
                        cover +
                        '<div class="caption">' +
                        '<div class="goodsName">' +
                        '<span>' + gname + '</span></div><span class="gid" style="display:none;">' + obj.id + '</span>' +
                        '<span style="color: red;font-size: 22px;font-weight: bold;">￥' + obj.price + '</span>' +
                        '</div></div></div>')
                })
        },
        error: function() {
            console.log("获取" + tag + "板块商品失败")
        }
    })
}
//好哥哥超市换一批
$('.reloadchaoshi').click(function() {
    getBankuaiGoods('chaoshi', '好哥哥超市');
})

// function getSaleGoods(limit, pageItem, tiaojian) {
//     $.ajax({
//         url: "/supermarketSSM/getSaleGoods.do",
//         data: page = {
//             limit: limit,
//             pageItem: pageItem,
//             tiaojian: tiaojian
//         },
//         type: "post",
//         dataType: "json",
//         async: false,
//         success: function(data) {
//             //清空内容
//             $("#yibanGoods").empty();
//             $.each(data.list,
//                 function(index, obj) {
//                     var cover = "<div class='imgBox'><img class='imgs' src='/supermarketSSM/img/goodsImg/" + obj.cover + "' alt='暂无'> </div>"
//                     $("#yibanGoods").append(
//                         '<div class="col-md-3">' +
//                         '<div class="thumbnail">' +
//                         cover +
//                         '<div class="caption">' +
//                         '<div class="goodsName">' +
//                         '<span>' + obj.gname + '</span></div>' +
//                         '<span>￥' + obj.price + '</span>' +
//                         '</div></div></div>')


//                 })
//             console.log("商品加载")
//         },
//         error: function() {
//             console.log("还没开张")
//         }
//     })
// }

//点击商品框 弹出详细信息
function getGoodsAll(obj) {

    id = $(obj).find('span[class^="gid"]').text()
    console.log(id)
    $('#modal-553377').click()
    $.ajax({
        url: "/supermarketSSM/findGoods.do",
        type: "post",
        dataType: "json",
        data: {
            id: $(obj).find('span[class^="gid"]').text()
        },
        success: function(data) {
            //选择数量
            $('#number').text("0")
                //设置id
            $('#modal-container-553377').find('p[id^="goodsid"]').text(data.id)
                //设置商品名
            $('#modal-container-553377').find('p[id^="goodsName"]').text(data.gname)
                //设置价格
            $('#modal-container-553377').find('span[id^="salePrice"]').text("￥" + data.price)
                //设置销量和库存
            $('#modal-container-553377').find('span[id^="goodsStockAndSale"]').text("剩余库存:" + data.stock + " || 积累销量:" + data.sale)
                //设置商品图片
            $('#modal-container-553377').find('img[class^="imgs"]').attr("src", "/supermarketSSM/img/goodsImg/" + data.cover)
                //设置商品描述
            $('#modal-container-553377').find('p[id^="goodsEx"]').text(data.expatiate)
        }
    })
}
//数量选择
$('.plus').click(function() {
    number = $('#number').text()
    temp = parseInt(number) + 1
    $('#number').text(temp + "")

})
$('.minus').click(function() {
        number = $('#number').text()
        if (number == "0") {

        } else {
            temp = parseInt(number) - 1
            $('#number').text(temp + "")
        }
    })
    //点击 立即购买
function goBuyNow() {
    $('#modal-container-415225').find('div[class^="modal-footer"]').empty()
    $('#modal-container-415225').find('div[class^="modal-footer"]').append('<button type="button" class="btn btn-success goBuyNowYes" onclick="goBuyNowYes()" style="display: block;">确认购买</button>')

    if (getUserMsg() == undefined) {
        alert('请先登录')
    } else {

        //根据id得到商品信息
        goodsid = $('#modal-container-553377').find('p[id^="goodsid"]').text()
        $.ajax({
                url: "/supermarketSSM/findGoods.do",
                type: "post",
                dataType: "json",
                data: {
                    id: $('#modal-container-553377').find('p[id^="goodsid"]').text()
                },

                success: function(data) {
                    console.log(data)
                        //清除多余
                    $('#modal-container-415225').find('div[class^="modal-body"]').empty();
                    temp = "<img  src='/supermarketSSM/img/goodsImg/" + data.cover + "' alt='暂无' style='width:100px;,height:100px'>" +
                        '<p class="goodsid" style="display: none;">' + data.id + '</p><p style="font-weight: bold;font-size: 18px;">' + data.gname + '</p>' +
                        '<span style="color: red;font-size: 22px;font-weight: bold;">￥' + data.price + '</span>' +
                        '<span style="color: rgb(133, 133, 133);">剩余库存:<span id=goodsStock>' + data.stock + '</span></span>' +
                        '<div class="form-group">' +
                        '<label for="exampleInputPassword1">输入购买数量</label>' +
                        '<input type="number" class="form-control" id="buyNum" />' +
                        '</div>' +
                        '<div id="addressForJustBuy" style="height: 72px; background-color: #f3f3f3; padding:3px" onclick="addressForJustBuy()">选择收货地址</div>'
                    $('#modal-container-415225').find('div[class^="modal-body"]').append(temp)

                }
            })
            //商品详情消失
        $('#modal-container-553377').find('button[class^="close"]').click()
            //购买菜单出现
        $('#modal-415225').click()

    }
}
//直接购买时选择收货地址
function addressForJustBuy() {
    //加载地址数据
    getAddressToChoose()
        //隐藏多余
    $('#modal-container-900').find('button[id^="addAddress"]').css("display", "none")
    $('#modal-900').click()
}

//得到选择地址的表格
function getAddressToChoose() {
    $.ajax({
        url: "/supermarketSSM/getUserAddress.do",
        type: "post",
        dataType: "json",
        success: function(data) {
            $("#userAddress  tr:not(:first)").html("");
            $.each(data, function(index, obj) {
                address = '<address><strong style="font-size: 23px;">' + obj.addressName + '</strong><strong style="font-size: 18px; color: #5e5e5e;">' + obj.phone + '</strong>' +
                    '<br/>' + obj.area + '<br/>' + obj.address + '</address>'
                choose = '<button class="btn btn-primary " onclick="chooseAddress(this)">选择</button>'
                addressID = '<span style="display:none">' + obj.addressID + '</span>'
                td = '<td>' + (index + 1) + '</td>' +
                    '<td>' + address + '</td>' +
                    '<td>' + obj.tag + '</td>' +
                    '<td>' + choose + addressID + '</td>'
                tr = '<tr>' + td + '</tr>'
                $('#userAddress').append(tr)

            })
        },
        error: function() {
            alert("获取收货地址信息失败")
        }
    })
}

//点击地址表格选择地址
function chooseAddress(obj) {
    $(obj).val('歪比歪比')
    var _ChooseAddressID = $(obj).next().text()
    console.log(_ChooseAddressID)
    $.ajax({
            url: "/supermarketSSM/getAddressByID.do",
            type: "post",
            data: { addressID: _ChooseAddressID },
            dataType: "json",
            success: function(data) {
                console.log(data)
                $('#addressForJustBuy').empty()
                $.each(data, function(index, obj) {
                    address = '<strong id="addressID" style="display:none">' + obj.addressID + '</strong><strong style="font-size: 23px;">' + obj.addressName + '</strong><strong style="font-size: 18px; color: #5e5e5e;">' + obj.phone + '</strong><br>' + obj.area + '<br>' + obj.address
                    $('#addressForJustBuy').append(address)
                })

            }
        })
        //关闭表格
    $('#modal-container-900').find('button[class^="close"]').click()
}
//直接购买确认购买
function goBuyNowYes() {
    buyNum = $("#buyNum").val()
    stock = $('#goodsStock').text()
    addressID = $('#addressID').text()
    console.log(addressID)
    if (Number(buyNum) > Number(stock)) {
        alert("没这么多库存")
    } else if (buyNum <= 0) {
        alert("请正确输入")
    } else if (addressID.length <= 0) { //未选择地址
        alert("请先选择地址")
    } else {
        // var myDate = new Date;
        // var year = myDate.getFullYear() + ""; //获取当前年
        // var mon = myDate.getMonth() + 1; //获取当前月
        // var date = myDate.getDate();
        var saleDetailsList = [];
        saleDetails = {
            goodsID: $('#modal-container-553377').find('p[id^="goodsid"]').text(),
            buyNum: $("#buyNum").val(),
        }
        saleDetailsList.push(saleDetails);
        console.log(saleDetailsList)
        $.ajax({
            url: "/supermarketSSM/Justbuy.do",
            data: {
                list: JSON.stringify(saleDetailsList),
                addressID: $('#addressID').text()
            },
            type: "post",
            success: function(data) {
                alert(data)
            },
            error: function() {
                alert("购买失败")
            }
        })
    }
}
//点击 购物车（购物车查看
$("#Shopcar").click(
    function() {
        showShopcar(getUserMsg())
    }
)

//点击添加购物车
function addShopcar() {

    if (getUserMsg() == undefined) {
        alert("请先登录")
    } else if ($('#number').text() == "0") {
        alert("选择的数量为零")
    } else {
        shopcar = {
            //拿到用户id
            userid: getUserMsg(),
            //拿到商品id
            goodsid: $('#modal-container-553377').find('p[id^="goodsid"]').text(),
            //拿到添加数量
            goodsNum: $('#number').text()
        }
        console.log(shopcar)
        $.ajax({
            url: "/supermarketSSM/addShopcar.do",
            data: shopcar,
            type: "post",
            success: function(data) {
                alert(data)
            },
            error: function() {
                alert("添加失败")
            }
        })
    }
}

function showShopcar(userName) {
    if (userName == undefined) {
        alert("登录后才能查看购物车！")
    } else {
        $('#modal-456').click()
        $.ajax({
            url: "/supermarketSSM/getShopcar.do",
            data: {
                userid: userName
            },
            type: "POST",
            dataType: "json",
            //设置为同步 不然return不到值
            async: false,
            success: function(data) {
                //清空表格
                $("#shopcarTable tr:not(:first)").html("");
                $.each(data,
                    function(index, obj) {
                        if (obj.goodsName.length > 10) { //要求字数大于10才进行字数替换
                            var name = obj.goodsName.replace(/\s+/g, "").substr(0, 10) + "..."
                                //从0到10开始替换，将剩余文本内容替换为"..."
                        } else {
                            var name = obj.goodsName
                        }
                        var cover = "<img class='shopcarImgs' src='/supermarketSSM/img/goodsImg/" + obj.cover + "' alt='暂无'>"
                        $("#shopcarTable").append(
                            '<tr><td><input name="chooseOneGoods" type="checkbox" value="' + obj.goodsid + '" onclick="getAllPrice()"/></td>' +
                            '<td>' + name + '</td>' +
                            '<td>' + cover + '</td>' +
                            '<td id="BuyGoodsPrice">' + obj.goodsPrice + '</td>' +
                            '<td id="BuyGoodsNum">' + obj.goodsNum + '</td>' +
                            '<td><button type="button" class="btn btn-success" onclick="delShopcar(this)">删除</button></td>' +
                            '</tr>'
                        )
                    })
                $("#shopcarTable").append(
                    '<tr class="warning"><td><b>合计:</b></td>' +
                    '<td><b id="allBuyPeice">0</b></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '</tr>'
                )

            },
            error: function() {
                alert("购物车信息丢了")
            }
        })
    }
}
//点击 前往结算
function shopcarGoBuy() {
    $('#modal-container-415225').find('div[class^="modal-footer"]').empty()
    $('#modal-container-415225').find('div[class^="modal-footer"]').append('<button type="button" class="btn btn-success shopcarBuyNow" onclick="shopcarBuyNow()">确认购买</button>')
    if (getUserMsg() == undefined) {
        alert('请先登录')
    } else if ($('#allBuyPeice').text() == "0") { //没有勾选商品
        alert('请选择商品')
    } else {
        $('#modal-container-415225').find('div[class^="modal-body"]').empty()
        allBuyPeice = $('#allBuyPeice').text();
        temp =
            '<span style="color: red;font-size: 22px;font-weight: bold;">合计:' + allBuyPeice + '</span>' +
            '<div id="addressForJustBuy" style="height: 72px; background-color: #f3f3f3; padding:3px" onclick="addressForJustBuy()">选择收货地址</div>'
        $('#modal-container-415225').find('div[class^="modal-body"]').append(temp)
            //购物车消失
        $('#modal-container-456').find('button[class^="close"]').click()
            //购买菜单出现
        $('#modal-415225').click()
    }
}

//勾选购物车商品 合计变化
function getAllPrice() {
    var all = 0
    $("#allBuyPeice").text(all)
    var len = $('input[name="chooseOneGoods"]:checked').length
    console.log(len)
    var len = $('input[name="chooseOneGoods"]:checked').each(
        function(index, element) {

            goodsPrice1 = $(this).parent().next().next().next().text()
            goodsNum1 = $(this).parent().next().next().next().next().text()
            console.log(goodsPrice1 + "*" + goodsNum1)
            all += (goodsPrice1 * goodsNum1)
            if (index == len - 1) {
                $("#allBuyPeice").text(all)
            }
        }
    )
}


//移出购物车
function delShopcar(obj) {
    if (confirm("确定要移出吗?")) {
        $.ajax({
            url: "/supermarketSSM/delShopcar.do",
            data: { goodsid: $(obj).parent().prev().prev().prev().prev().prev().children().val() },
            type: 'POST',
            success: function(data) {
                alert(data)
                showShopcar(getUserMsg())
            },
            error: function() {
                alert("移出购物车错误")
            }

        })
    }

}
//购物车结账
function shopcarBuyNow() {
    addressID = $('#addressID').text()
    if (addressID.length <= 0) { //未选择地址
        alert("请先选择地址")
    } else {
        var saleDetailsList = [];
        $('input[name="chooseOneGoods"]:checked').each(
            function(index, element) {
                //saleDetails追加到数组中
                saleDetails = {
                    goodsID: $(this).val(),
                    buyNum: $(this).parent().next().next().next().next().text(),
                    price: $(this).parent().next().next().next().text()
                }
                saleDetailsList.push(saleDetails);
            }
        );
        //商品id 和购买数量
        console.log(saleDetailsList)
        $.ajax({
            url: "/supermarketSSM/shopcarBuy.do",
            data: {
                list: JSON.stringify(saleDetailsList),
                addressID: $('#addressID').text()
            },
            type: 'POST',
            success: function(data) {
                alert(data)

            },
            error: function() {
                console.log("系统错误 结算失败")
            }
        })
    }
}

$("#checkBuyMsg").click(

    function() {
        _imit = 0;
        _pageitem = 8;
        _page = 1
        getSale(_imit, _pageitem)
        console.log("sale表初始化" + _page)
    }
)

function getSale(limit, pageItem) {
    var result;
    $.ajax({
        url: "/supermarketSSM/getUserSale.do",
        data: page = {
            tiaojian: getUserMsg(),
            limit: limit,
            pageItem: pageItem,
        },
        type: "POST",
        dataType: "json",
        //设置为同步 不然return不到值
        async: false,
        success: function(data) {
            //清空表格
            $("#saleTable  tr:not(:first)").html("");
            $.each(data.list,
                function(index, obj) {
                    td = "<td>" + obj.goodsName + "</td>" +
                        "<td>" + obj.goodsNum + "</td>" +
                        "<td>" + obj.goodsPrice + "</td>" +
                        "<td>" + obj.time + "</td>"
                    tr = "<tr>" + td + "</tr>";
                    $("#saleTable").append(tr);
                })
            _item = data.item
            _maxPage = Math.ceil(_item / 5)
            console.log("现在信息数:" + _item + "@最大页数::" + _maxPage)
        }
    })
}

function page_down_sale() {
    _limit += 5
    _page += 1
    if (_page > _maxPage) {
        alert("已经是最后一页！！！")
        _page = _maxPage
        _limit -= 5
    } else {
        getSale(_limit, _pageitem)
    }
    console.log("sale点了下一页：" + _page)

}

function page_up_sale() {
    _limit -= 5
    _page -= 1
    if (_page <= 0) {
        _limit = 0;
        _page = 1
        alert("已经是第一页！")
        return
    }
    console.log("sale点了上一页 现在页数为：" + _page)
    getSale(_limit, _pageitem)
}
// 查看购买记录 end

//登出
$("#logout").click(
    function() {
        if (confirm("确定要登出吗")) {
            $.ajax({
                url: "/supermarketSSM/logout.do",
                data: {},
                type: "POST",
                success: function(data) {
                    alert(data)
                    window.location.reload()
                },
                error: function() {}
            })
        } else {

        }
    })