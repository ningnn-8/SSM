//点击查看销售 初始化
$("#checkSale").click(
    function() {
        _limit = 0;
        //每页显示信息数
        _pageitem = 2
            //总信息数
        _item = getSale(_limit, _pageitem)
        _maxPage = Math.ceil(_item / _pageitem)
        console.log("wbwb!!" + _maxPage)
            //当前页数
        _page = 1;
    }
)

function getSale(limit, pageItem) {
    $('#saleContent').empty()
    var result;
    t = $("#saleOption option:selected").val()
    console.log("getSale")
    console.log(t)
    $.ajax({
        url: "/supermarketSSM/getSale.do",
        data: page = {
            tiaojian: t,
            limit: limit,
            pageItem: pageItem,
        },
        type: "POST",
        dataType: "json",
        //设置为同步 不然return不到值
        async: false,
        success: function(data) {
            result = data.item
                //地址idlist
            var addressIDList = []
            $.each(data.list,
                function(index, obj) {
                    addressIDList.push(obj.addressID)
                    userid = obj.userid
                    if (obj.code == '') {
                        var code = '暂无'
                    } else {
                        var code = obj.code
                    }
                    if (obj.type == '待发货') { //待发货订单

                        temp = '<div class="panel panel-warning">' +
                            '<div class="panel-heading">' +
                            '<a class="panel-title" data-toggle="collapse" data-parent="#panel-686403" href="#' + obj.id + '">待处理订单' + (index + 1) + '</a>' +
                            '</div>' +
                            '<div id="' + obj.id + '" class="panel-collapse in">' +
                            '<div class="panel-body"></div>' +
                            '<div class="panel-footer">' +
                            '<span>下单时间：' + obj.time + '</span>' +
                            '<p>快递单号：' + code + '</p><p class="' + obj.userid + '">购买者</p><p class="' + obj.addressID + '">收货地址：</p>' +
                            '<p class="address"></p>' +
                            '<button type="button" class="btn btn-default btn-warning active">待发货</button>' +
                            '<button id="' + obj.id + '"class="btn btn-success " onclick="fahuo(this)">发货</button></div></div></div>'

                    } else if (obj.type == '待收货') { //已发货/待收货订单
                        temp = '<div class="panel panel-info">' +
                            '<div class="panel-heading">' +
                            '<a class="panel-title" data-toggle="collapse" data-parent="#panel-686403" href="#' + obj.id + '">待处理订单' + (index + 1) + '</a>' +
                            '</div>' +
                            '<div id="' + obj.id + '" class="panel-collapse in">' +
                            '<div class="panel-body"></div>' +
                            '<div class="panel-footer">' +
                            '<span>下单时间：' + obj.time + '</span>' +
                            '<p>快递单号：' + code + '</p><p class="' + obj.userid + '">购买者</p><p class="' + obj.addressID + '">收货地址：</p>' +
                            '<button type="button" class="btn btn-default btn-info active">以发货</button>'

                    } else { //已收货
                        temp = '<div class="panel panel-success">' +
                            '<div class="panel-heading">' +
                            '<a class="panel-title" data-toggle="collapse" data-parent="#panel-686403" href="#' + obj.id + '">待处理订单' + (index + 1) + '</a>' +
                            '</div>' +
                            '<div id="' + obj.id + '" class="panel-collapse in">' +
                            '<div class="panel-body"></div>' +
                            '<div class="panel-footer">' +
                            '<span>下单时间：' + obj.time + '</span>' +
                            '<p>快递单号：' + code + '</p><p class="' + obj.userid + '">购买者</p><p class="' + obj.addressID + '">收货地址：</p>' +
                            '<button type="button" class="btn btn-default btn-info active">以发货</button>'
                    }
                    box = '<div class="col-md-6">' + temp + '</div>'
                    $('#saleContent').append(box)

                    var goodsIDList = []

                    //拿到saleid
                    id = obj.id
                    console.log("saleID::" + id)
                        //拿着saleID查saleDetails
                    $.ajax({
                        url: "/supermarketSSM/getSaleDetailsBySaleID.do",
                        data: { saleID: id },
                        type: "post",
                        dataType: "json",
                        success: function(data) {

                            console.log(data)
                            $.each(data,
                                    function(index, obj) {
                                        goodsIDList.push(obj.goodsID)
                                        temp2 = '<div class="col-md-4"><div class="thumbnail">' +
                                            '<img class="' + obj.goodsID + '" alt="300x200" src="" />' +
                                            '<div class="caption">' +
                                            '<span style="color: red;font-weight: bold;font-size: 16px;">￥' + obj.price + '   </span>' +
                                            '<span style="color: black;font-weight: bold;font-size: 10px;">   购买' + obj.buyNum + '件</span>' +
                                            '</div></div></div>'
                                        $('#' + obj.saleID).find('div[class^="panel-body"]').append(temp2)
                                    })
                                //拿着goodsIDList查商品
                            console.log("@@" + goodsIDList)
                            $.ajax({
                                    url: "/supermarketSSM/getGoodsBygoodsIDList.do",
                                    data: "list=" + goodsIDList,
                                    type: "post",
                                    dataType: "json",
                                    success: function(data) {
                                        console.log("goodsMsg")
                                        console.log(data)
                                        $.each(data,
                                            function(index, obj) {
                                                console.log("[" + obj.id + "]" + obj.cover)
                                                $('.' + obj.id).attr("src", "/supermarketSSM/img/goodsImg/" + obj.cover)
                                            })

                                    }
                                })
                                //userid查找用户名
                            $.ajax({
                                    url: "/supermarketSSM/findUserByID.do",
                                    data: { userid: userid },
                                    type: "post",
                                    dataType: "json",
                                    success: function(data) {
                                        console.log("findUserByID::")
                                        console.log(data)
                                        $('.' + data.uid).empty()
                                        $('.' + data.uid).append("用户名:" + data.username)
                                    }
                                })
                                //拿着addressIDList查地址信息
                            $.ajax({
                                url: "/supermarketSSM/getaddressByaddressIDList.do",
                                data: "list=" + addressIDList,
                                type: "post",
                                dataType: "json",
                                success: function(data) {
                                    console.log("addressMsg")
                                    console.log(data)
                                    $.each(data,
                                        function(index, obj) {
                                            console.log(obj.addressID)
                                            $('.' + obj.addressID).empty()
                                            $('.' + obj.addressID).append("收件人:" + obj.addressName + "联系电话:" + obj.phone + '<p>地址：' + obj.area + "::" + obj.address + '</P>')
                                        })

                                }
                            })
                        }
                    })

                })
        }
    })
    return result;
}


//上一页
function page_up_Sale() {
    _limit -= _pageitem
    if (_limit < 0) {
        _limit = 0;
        alert("已经是第一页！")
        return
    }
    _page -= 1
    console.log("点了上一页 现在页数为：" + _page)
    getSale(_limit, _pageitem)
}
//下一页
function page_down_Sale() {
    _limit += _pageitem
    _page += 1
    if (_page > _maxPage) {
        alert("已经是最后一页！！！")
        _page = _maxPage
        _limit -= _pageitem
    } else {
        getSale(_limit, _pageitem)
    }
    console.log("点了下一页：" + _limit + "::" + _page)
}

//下拉框选择
function saleOptionFunc() {
    var v = $("#saleOption option:selected").val()
    console.log(v)
    _limit = 0
    _item = getSale(0, _pageitem)
        //更新最大页数
    _maxPage = Math.ceil(_item / _pageitem)
}

//订单发货
function fahuo(obj) {
    console.log($(obj).attr("id"))
    $('#modal-container-599488').find('div[class^="modal-body"]').empty()
    content = "<P>订单:</P><p id='saleID'>" + $(obj).attr("id") + "</p><br>" + '<label for="exampleInputFile">输入快递单号：</label><input type="text" class="form-control" id="code" />'
    $('#modal-container-599488').find('div[class^="modal-body"]').append(content)
    $('#modal-599488').click()
}

$('#gofahuo').click(function() {
    if ($('#code').val() == '') {
        alert("请输入快递单号")
    } else {
        $.ajax({
            url: "/supermarketSSM/fahuo.do",
            data: {
                saleID: $('#saleID').text(),
                code: $('#code').val()
            },
            type: "post",
            success: function(data) {
                alert(data)
                _item = getSale(_limit, _pageitem)
                _maxPage = Math.ceil(_item / _pageitem)
            }

        })

    }
})