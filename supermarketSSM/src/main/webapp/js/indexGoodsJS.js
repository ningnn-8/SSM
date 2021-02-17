/*管理商品JS*/
$(document).ready(
    function() {
        //得到user信息
        getUserMsg()

        _limit = 0;
        //每页显示信息数
        _pageitem = 5
            //总信息数
        _item = getGoods(_limit, _pageitem, "none")
            //最大页数
        _maxPage = Math.ceil(_item / _pageitem)
            //当前页数
        _page = 1;
        //console.log("总信息数 ——item：：" + _item + "数据类型：" + typeof(_item))
        console.log("商品表 总信息数" + _item + "最大页数:" + _maxPage)
    }

)

$('#upload_file').on('input', () => {
    console.log($('#upload_file')[0].files[0]);
    var windowURL = window.URL || window.webkitURL;
    var dataURL = windowURL.createObjectURL($('#upload_file')[0].files[0]);
    $('#imgYulan').attr('src', dataURL)
})

//得到用户信息
function getUserMsg() {
    $.ajax({
        url: "/supermarketSSM/getUserMsg.do",
        dataType: "json",
        success: function(data) {
            console.log(data.jiaoseid)
            if (data.jiaoseid == 2) {
                $("#userName").text('店员' + data.username)
                    //隐藏订单和删除商品功能
                $('#checkOrder').css('display', 'none');
                $('.del').css('display', 'none');
            } else if (data.jiaoseid == 3) {
                $("#userName").text('店长' + data.username)
            } else if (data.jiaoseid == 4) {
                $("#userName").text('管理员' + data.username)
                $('#checkUser').css('display', 'block');
            }
        },
        error: function() {
            console.log("得不到用户信息")
        }
    })
}
//全选商品
$("#checkAllGoods").change(
        function() {
            console.log("wdnmd")
            $("input[name='chooseOneGoods']").prop("checked", this.checked);
        }
    )
    //点击查看商品
$("#checkGoods").click(
        function() {
            _limit = 0;
            //每页显示信息数
            _pageitem = 5
                //总信息数
            _item = getGoods(_limit, _pageitem, "none")
                //最大页数
            _maxPage = Math.ceil(_item / _pageitem)
            console.log("商品表：总信息数" + _item + "::最大页数" + _maxPage);
            //当前页数
            _page = 1;
        }
    )
    //上一页
function page_up() {
    _limit -= 5

    if (_limit < 0) {
        _limit = 0;
        alert("已经是第一页！")
        return
    }
    _page -= 1
    console.log("点了上一页 现在页数为：" + _page)
    getGoods(_limit, _pageitem)
}
//下一页
function page_down() {
    _limit += _pageitem
    _page += 1
    if (_page > _maxPage) {
        alert("已经是最后一页！！！")
        _page = _maxPage
        _limit -= _pageitem
    } else {
        getGoods(_limit, _pageitem)
    }
    console.log("点了下一页：" + _limit + "::" + _page)
}

//下拉框选择
function sortOptionFunc() {
    var v = $("#sortoption option:selected").val()
    console.log(v)
    _limit = 0
    _item = getGoods(0, _pageitem)
        //更新最大页数
    _maxPage = Math.ceil(_item / _pageitem)
}
//提交查询信息
$("#searchBTN").click(
    function() {
        _limit = 0
        _item = getGoods(0, _pageitem)
            //更新最大页数
        _maxPage = Math.ceil(_item / _pageitem)
        console.log("查询后最大页数" + _maxPage)
            //回到第一页
        _page = 1;
    }
)

var table = $("#table");
//查询的起始条数 每页显示数
function getGoods(limit, pageItem) {
    var result;
    var t = $("#tiaojian");
    var a = t.val()
    page = {
        tiaojian: $("#tiaojian").val(),
        limit: limit,
        pageItem: pageItem,
        sort: $("#sortoption option:selected").val()
    }
    console.log(page)
    $.ajax({
        url: "/supermarketSSM/showGoods.do",
        data: page,
        type: "POST",
        dataType: "json",
        //设置为同步 不然return不到值
        async: false,
        success: function(data) {
            //清空表格
            $("#table  tr:not(:first)").html("");
            $.each(data.list,
                    function(index, obj) {
                        //商品名
                        if (obj.gname.length > 6) { //要求字数大于10才进行字数替换
                            var gname = obj.gname.replace(/\s+/g, "").substr(0, 6) + "..."
                                //从0到10开始替换，将剩余文本内容替换为"..."
                        } else {
                            var gname = obj.gname
                        }
                        //商品封面图
                        if (obj.cover == "") {
                            var cover = "<b>暂无</b>"
                        } else {
                            var cover = "<img class='imgs' src='/supermarketSSM/img/goodsImg/" + obj.cover + "' alt='错误'>"
                        }
                        var caozuo =
                            "<button class='btn btn-default' id='change' href='#modal-container-9387' data-toggle='modal'>修改</button>" +
                            "<button class='btn btn-default del'>删除</button>"
                            //商品详情
                        if (obj.expatiate == null) {
                            var expatiate = " "
                        } else if (obj.expatiate.length > 10) { //要求字数大于10才进行字数替换
                            var expatiate = obj.expatiate.replace(/\s+/g, "").substr(0, 10) + "..."
                                //从0到10开始替换，将剩余文本内容替换为"..."
                        } else {
                            var expatiate = obj.expatiate
                        }
                        if (obj.isSale == "是") {
                            caozuo += "<button class='btn btn-warning isSaleChangeToNo'>下架商品</button>"
                        } else {
                            caozuo += "<button class='btn btn-success isSaleChangeToYes'>上架商品</button>"
                        }
                        var td = "<td style='display:none;'>" + obj.id + "</td>" +
                            "<td>" + gname + "</td>" +
                            "<td>" + obj.price + "</td>" +
                            "<td>" + obj.stock + "</td>" +
                            "<td>" + obj.sale + "</td>" +
                            "<td>" + obj.tag + "</td>" +
                            "<td>" + expatiate + "</td>" +
                            "<td>" + cover + "</td>" +
                            "<td>" + obj.isSale + "</td>" +
                            "<td>" + caozuo + "</td>";
                        var tr = "<tr>" + td + "</tr>";
                        table.append(tr);
                    })
                //返回信息总数
            result = data.item
        },
        error: function() {
            console.log("爷不伺候！！！")
        }
    })
    return result;
}


//点击“上传封面图”

function coverUpload(obj) {
    var f = document.getElementById('upload_file');
    f.outerHTML = f.outerHTML;
    //获取当前行
    var currentRow = $(obj).closest("tr");
    _uploadCoverGoodsName = currentRow.find("td:eq(1)").text();
    console.log(_uploadCoverGoodsName)
    $(".uploadCoverGoods").text("上传商品[" + _uploadCoverGoodsName + "]的封面图")
    $("#upload_file").empty()
}

$("#goUploadCover").click(
        function() {
            console.log(_uploadCoverGoodsName)
            var file = $("#upload_file")
            if (file.val() == "") {
                alert("请先选择文件")
                file.click();
            } else {
                //开始上传文件
                var f = new FormData();
                f.append("upload_file", $("#upload_file")[0].files[0])
                f.append("goodsName", _uploadCoverGoodsName)
                $.ajax({
                    url: "/supermarketSSM/fileupload", //后台URL
                    type: "post",
                    data: f,
                    contentType: false,
                    cache: false,
                    processData: false, //必须false才会避开jQuery对 formdata 的默认处理,XMLHttpRequest会对 formdata 进行正确的处理
                    success: function(data) {
                        alert(data)
                            //重新加载表格
                        getGoods(_limit, _pageitem)
                    }
                });
            }
        }
    )
    //点击 添加商品
$("#addGoods").click(function() {
        $("#inputGoodsName").val('')
        $("#inputGoodsPrice").val('')
        $("#inputGoodsStock").val('')
        $("#inputGoodsExpatiate").val('')
        $("#upload_file").val("")
        $('#goChangeGoods').css('display', 'none');
        $('#goAddGoods').css('display', 'block');
        $('#imgYulan').attr('src', '');
    })
    // 确认添加
$("#goAddGoods").click(
        function() {
            var file = $("#upload_file")
            var f = new FormData();
            goods = {}
            if (file.val() == "" || $("#inputGoodsName").val() == "") {
                alert("必要信息不全")
            } else {
                //开始上传文件
                f.append("upload_file", $("#upload_file")[0].files[0])

                goods.gname = $("#inputGoodsName").val()
                goods.price = $("#inputGoodsPrice").val()
                if ($("#inputGoodsStock").val() == "") {
                    goods.stock = 0
                } else {
                    goods.stock = $("#inputGoodsStock").val()
                }
                goods.sale = 0
                goods.isSale = "否"
                goods.tag = $('#tag').val()
                if ($("#inputGoodsExpatiate").val() == "") {
                    goods.expatiate = "暂无商品描述"
                } else {
                    goods.expatiate = $("#inputGoodsExpatiate").val()
                }
                goodsJ = JSON.stringify(goods)
                f.append("goods", goodsJ)
                console.log(goodsJ)
                $.ajax({
                    url: "/supermarketSSM/addGoods.do",
                    data: f,
                    type: "POST",
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function(data) {
                        alert(data)
                    },
                    error: function() {
                        alert("系统错误 添加失败")
                    }
                })
            }
            //跳转至第一页
            _limit = 0
            _item = getGoods(0, _pageitem)
        }
    )
    //渲染修改商品弹出框
$("#table").on('click', '#change', function() {
        $('#goAddGoods').css('display', 'none');
        $('#goChangeGoods').css('display', 'block');
        //获取当前行
        var currentRow = $(this).closest("tr");
        _col1 = currentRow.find("td:eq(0)").html(); //当前行第二个TD的值 商品名
        console.log(_col1)
        $.ajax({
            url: "/supermarketSSM/findGoods.do",
            type: "post",
            dataType: "json",
            data: {
                id: _col1
            },
            success: function(data) {
                console.log(data)
                $("#inputGoodsName").val(data.gname)
                $("#inputGoodsStock").val(data.stock)
                $("#inputGoodsPrice").val(data.price)
                $("#inputGoodsExpatiate").val(data.expatiate)
                $("#tag option[value='" + data.tag + "']").attr("selected", true)
                $('#imgYulan').attr('src', '/supermarketSSM/img/goodsImg/' + data.cover);
                $("#upload_file").val("")
            },
            error: function() {
                alert("获取商品数据错误")
            }
        })
    })
    //提交 修改商品 
$('#goChangeGoods').click(
        function() {
            cName1 = $("#changeGoodsName").val()
            cPrice1 = $("#changeGoodsPrice").val()
            cStock1 = $("#changeGoodsStock").val()
            goodsChange = {
                id: _col1,
                cGname: $("#inputGoodsName").val(),
                cPrice: $("#inputGoodsPrice").val(),
                cStock: $("#inputGoodsStock").val(),
                cTag: $("#tag").val(),
                cExpatiate: $("#inputGoodsExpatiate").val(),
            }
            console.log(goodsChange)
                //修改文本信息
            $.ajax({
                    url: "/supermarketSSM/changeGoods.do",
                    data: goodsChange,
                    type: "POST",
                    success: function(data) {
                        alert(data)
                            //重新加载表格
                        getGoods(_limit, _pageitem)
                    },
                    error: function() {
                        alert("修改出错！")
                    }
                })
                //修改封面图
            if ($('#upload_file').val() != '') {
                console.log(_col1 + "要改封面图了！")
                    //开始上传文件
                var f = new FormData();
                f.append("upload_file", $("#upload_file")[0].files[0])
                f.append("goodsid", _col1)
                $.ajax({
                    url: "/supermarketSSM/fileupload22.do", //后台URL
                    type: "post",
                    data: f,
                    contentType: false,
                    cache: false,
                    processData: false, //必须false才会避开jQuery对 formdata 的默认处理,XMLHttpRequest会对 formdata 进行正确的处理
                    success: function(data) {
                        //重新加载表格
                        getGoods(_limit, _pageitem)
                    }
                });
            }

        }
    )
    //删除商品
$("#table").on('click', '.del', function() {

        //获取当前行
        var currentRow = $(this).closest("tr");
        // alert(currentRow)
        _col1 = currentRow.find("td:eq(0)").html(); //当前行第二个TD的值 商品名

        if (confirm("你想要的删除这个商品吗?")) {

            $.ajax({
                url: "/supermarketSSM/delGoods.do",
                data: {
                    goodsid: _col1
                },
                type: 'POST',
                success: function(data) {
                    alert(data)
                    getGoods(_limit, _pageitem)

                },
                error: function() {
                    alert('delservlet不听你的话！')
                }
            })

            //alert("你是坏人！！！")
        } else {
            //alert("你是好人！")
        }

    })
    //商品上架
$("#table").on('click', '.isSaleChangeToYes', function() {

        //获取当前行
        var currentRow = $(this).closest("tr");
        // alert(currentRow)
        _col1 = currentRow.find("td:eq(0)").html(); //当前行第二个TD的值 商品名
        if (confirm("你想要的上架这个商品吗? 请确保信息正确！")) {
            $.ajax({
                    url: "/supermarketSSM/isSaleChange.do",
                    data: {
                        id: _col1
                    },
                    type: 'POST',
                    success: function(data) {
                        if (data == "no") {
                            alert("商品信息不全 请前往修改完善信息")
                        } else {
                            alert("商品上架成功")
                            getGoods(_limit, _pageitem)
                        }


                    },
                    error: function() {
                        alert('后端跑路了')
                    }
                })
                //alert("你是坏人！！！")
        } else {
            //alert("你是好人！")
        }

    })
    //商品下架
$("#table").on('click', '.isSaleChangeToNo', function() {
    //获取当前行
    var currentRow = $(this).closest("tr");
    // alert(currentRow)
    _col1 = currentRow.find("td:eq(1)").html(); //当前行第二个TD的值 商品名

    if (confirm("你想要的下架[" + _col1 + "]这个商品吗?")) {

        console.log("让我康康先")
        $.ajax({
                url: "/supermarketSSM/isSaleChangeToNo.do",
                data: {
                    gname: _col1
                },
                type: 'POST',
                success: function(data) {
                    alert(data)
                    getGoods(_limit, _pageitem)

                },
                error: function() {
                    alert('后端跑路了')
                }
            })
            //alert("你是坏人！！！")
    } else {
        //alert("你是好人！")
    }

})

//测试
function Ajax() {
    city1 = {
        //属性要和java里的一样
        id: 1,
        name: "奥比岛"
    }
    $.ajax({
        url: "/jiaofeiWEB/city",
        data: {
            city: JSON.stringify(city1)
        },
        type: "GET",
        success: function(data) {
            alert(data);
        },
        error: function() {
            alert("错误");
        }
    });
}