/*管理进货JS */

//点击查看订单 初始化订单
$("#checkOrder").click(
    function() {
        _limit = 0;
        //每页显示信息数
        _pageitem = 5
            //总信息数
        _item = getOrder(_limit, _pageitem)
            //当前页数
        _page = 1;
    }
)
var ordertable = $("#orderTable");
//订单表初始化
function getOrder(limit, pageItem) {
    var result;
    $.ajax({
        url: "/supermarketSSM/getOrder.do",
        data: page = {
            tiaojian: $("#tiaojianO").val(),
            limit: limit,
            pageItem: pageItem,
            sort: $("#sortoptionO option:selected").val()
        },
        type: "POST",
        dataType: "json",
        //设置为同步 不然return不到值
        async: false,
        success: function(data) {
            //清空表格
            $("#orderTable  tr:not(:first)").html("");
            $.each(data.list,
                function(index, obj) {

                    choose = "<input name='chooseOne' type='checkbox'/>"
                    caozuo = "<button class='btn btn-default' id='delOrder' >删除</button>";
                    td = "<td>" + choose + "</td>" +
                        "<td class='orderId' style='display:none'>" + obj.id + "</td>" +
                        "<td>" + obj.oname + "</td>" +
                        "<td>" + obj.num + "</td>" +
                        "<td>" + obj.inPrice + "</td>" +
                        "<td>" + obj.time + "</td>" +
                        "<td>" + obj.supply + "</td>" +
                        "<td>" + caozuo + "</td>";
                    tr = "<tr>" + td + "</tr>";
                    ordertable.append(tr);
                })
            _item = data.item

            _maxPage = Math.ceil(_item / _pageitem)
            console.log("现在信息数:" + _item + "@最大页数::" + _maxPage)
        },
        error: function() {
            console.log("没能从getOrder得到返回数据")
        }
    })
    return result;
}
//提交订单查询信息
$("#searchBTNO").click(
        function() {
            _item = getOrder(0, _pageitem)
                //回到第一页
            _page = 1;
        }
    )
    //订单排序下拉框选择
function sortOptionOFunc() {
    getOrder(0, _pageitem)
}
//上一页
function page_up_order() {
    _limit -= _pageitem
    _page -= 1
    if (_page <= 0) {
        _limit = 0;
        _page = 1
        alert("已经是第一页！")
        return
    }

    console.log("点了上一页 现在页数为：" + _page)
    getOrder(_limit, _pageitem)
}
//下一页
function page_down_order() {
    _limit += _pageitem
    _page += 1
    if (_page > _maxPage) {
        alert("已经是最后一页！！！")
        _page = _maxPage
        _limit -= _pageitem
    } else {
        getOrder(_limit, _pageitem)
    }
    console.log("点了下一页：" + _page)

}
//删除订单
$("#orderTable").on('click', '#delOrder', function() {
    //获取当前行
    var currentRow = $(this).closest("tr");
    // alert(currentRow)
    orderId = currentRow.find("td:eq(1)").html(); //当前行的商订单id 传到后台用来删除
    oname = currentRow.find("td:eq(2)").html(); //当前行的订单商品名
    console.log("订单id" + orderId)
    if (confirm("你确定要删除选中的[" + oname + "]这个订单记录吗?")) {

        $.ajax({
            url: "/supermarketSSM/delOrder.do",
            data: {
                //当前行的商订单id 传到后台用来删除
                orderId: currentRow.find("td:eq(1)").html()
            },
            type: 'POST',
            success: function(data) {
                //刷新表格
                getOrder(_limit, _pageitem)
                alert(data)
            },
            error: function() {
                alert('delservlet不听你的话！')
            }
        })
    }
})
$('#modal-938748').click(
        function() {
            $("#inputOrderGoodsName").val('')
            $("#inputOrderGoodsNum").val('')
            $("#inputOrderGoodsInPrice").val('')
            $("#inputOrderTime").val('')
            $("#inputOrderSupply").val('')
        }
    )
    //去添加订单
$("#addOrder").click(
    function() {
        order = {
            oname: $("#inputOrderGoodsName").val(),
            num: $("#inputOrderGoodsNum").val(),
            inPrice: $("#inputOrderGoodsInPrice").val(),
            time: $("#inputOrderTime").val(),
            supply: $("#inputOrderSupply").val()
        }
        console.log(order)
        $.ajax({
            url: "/supermarketSSM/addOrder.do",
            data: order,
            type: "POST",
            success: function(data) {
                alert(data)
            },
            error: function() {
                console.log("无货可进")
            }

        })
    }
)

$("#logout").click(
    function() {
        if (confirm("确定要登出吗")) {
            $.ajax({
                url: "/supermarketSSM/logout.do",
                data: {},
                type: "POST",
                success: function(data) {
                    alert(data)
                    window.location.href = "http://localhost:8080/supermarketSSM/login.do"

                },
                error: function() {}
            })
        } else {

        }
    })