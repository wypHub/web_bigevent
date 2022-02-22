$(function () {
    // 获取文章列表
    initArtCateList();
    var layer = layui.layer
    // 点击添加分类时 出现弹出层 绑定事件
    var indexAdd;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#tpl2').html()
        })

    })

    // 点击确认添加时 发起ajax请求 因为弹出层是动态生成的 所以只能用事件委托来添加事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                layer.close(indexAdd);
                initArtCateList();
            }
        })
    })

    // 删除功能模块
    $('tbody').on('click', '.btn-del', function () {
        var Id = $(this).parent().attr('data-id');
        // console.log(Id);
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + Id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                initArtCateList();
            }
        })
    })
    var indexEdit;
    // 修改功能模块
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#tpl3').html()
        })
        var Id = $(this).parent().attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                layui.form.val('form-edit', res.data)
                // console.log(res);
            }
        })
    })

    // 确认修改后发起更新数据请求
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

})

// 定义一个获取文章分类列表的函数

function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            var htmlStr = template('tpl1', res);
            $('tbody').html(htmlStr);
        }
    })
}