/*用户操作订单JS*/

$('#checkUserOrder').click(function() {
    getUserSale()
})

function getUserSale() {
    $('#modal-container-985').find('h4[class^="modal-title"]').text("待处理订单")
        //清空
    $('#modal-container-985').find('div[class^="modal-body"]').empty()
        //加载订单
    userid = getUserMsg()

    $.ajax({
        url: "/supermarketSSM/getUserSale.do",
        data: {
            id: userid,
            str: "待处理"
        },
        type: "post",
        dataType: "json",
        async: false,
        success: function(data) {
            //地址idlist
            var addressIDList = []
            $.each(data,
                function(index, obj) {
                    addressIDList.push(obj.addressID)
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
                            '<span>快递单号：' + code + '</span><p class="' + obj.addressID + '">收货地址：</p>' +
                            '<p class="address"></p>' +
                            '<button type="button" class="btn btn-default btn-warning active">待发货</button>' +
                            '<button id="' + obj.id + '"class="btn btn-success " onclick="delSale(this)">取消订单</button></div></div></div>'

                    } else { //已发货/待收货订单
                        temp = '<div class="panel panel-info">' +
                            '<div class="panel-heading">' +
                            '<a class="panel-title" data-toggle="collapse" data-parent="#panel-686403" href="#' + obj.id + '">待处理订单' + (index + 1) + '</a>' +
                            '</div>' +
                            '<div id="' + obj.id + '" class="panel-collapse in">' +
                            '<div class="panel-body"></div>' +
                            '<div class="panel-footer">' +
                            '<span>下单时间：' + obj.time + '</span>' +
                            '<span>快递单号：' + code + '</span><p class="' + obj.addressID + '">收货地址：</p>' +
                            '<button type="button" class="btn btn-default btn-info active">以发货</button>' +
                            '<button id="' + obj.id + '"class="btn btn-success " onclick="saveSale(this)">确认收货</button></div></div></div>'
                    }
                    $('#modal-container-985').find('div[class^="modal-body"]').append(temp)

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
}

//用户取消订单
function delSale(obj) {
    if (confirm("确定要取消此订单吗? 删除后无法恢复")) {
        $.ajax({
            url: "/supermarketSSM/delSale.do",
            data: { saleID: $(obj).attr("id") },
            type: 'POST',
            success: function(data) {
                alert(data)
                getUserSale()
            },
            error: function() {
                alert("取消订单失败")
            }

        })
    }
}
//用户确认收货
function saveSale(obj) {
    if (confirm("确定要确认收货吗? 请确保收到商品")) {
        $.ajax({
            url: "/supermarketSSM/saveSale.do",
            data: { saleID: $(obj).attr("id") },
            type: 'POST',
            success: function(data) {
                alert(data)
                getUserSale()
            },
            error: function() {
                alert("确认收货失败")
            }

        })
    }
}

//用户查看购物记录
$('#checkBuyMsg').click(
    function() {
        $('#modal-container-985').find('h4[class^="modal-title"]').text("购物记录")
            //清空
        $('#modal-container-985').find('div[class^="modal-body"]').empty()

        //加载购物记录信息
        userid = getUserMsg()

        $.ajax({
            url: "/supermarketSSM/getUserSale.do",
            data: {
                id: userid,
                str: "已收货"
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function(data) {
                //地址idlist
                var addressIDList = []
                $.each(data,
                    function(index, obj) {
                        addressIDList.push(obj.addressID)
                        if (obj.code == '') {
                            var code = '暂无'
                        } else {
                            var code = obj.code
                        }

                        temp = '<div class="panel panel-success">' +
                            '<div class="panel-heading">' +
                            '<a class="panel-title" data-toggle="collapse" data-parent="#panel-686403" href="#' + obj.id + '">购物记录' + (index + 1) + '</a>' +
                            '</div>' +
                            '<div id="' + obj.id + '" class="panel-collapse in">' +
                            '<div class="panel-body"></div>' +
                            '<div class="panel-footer">' +
                            '<span>下单时间：' + obj.time + '</span>' +
                            '<span>快递单号：' + code + '</span><p class="' + obj.addressID + '">收货地址：</p>' +
                            '</div></div></div>'

                        $('#modal-container-985').find('div[class^="modal-body"]').append(temp)

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
    }
)