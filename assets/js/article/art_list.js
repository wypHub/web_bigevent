// 定义美化时间的过滤器
template.defaults.imports.FormData = function (date) {
    const dt = new Date(date);

    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());

    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + '年' + m + '月' + d + '日' + ' ' + hh + '时' + mm + '分' + ss + '秒'
}
// 定义一个时间补零的函数
function padZero(n) {
    return n > 9 ? n : '0' + n;
}



var q = {
    pagenum: 1,  // 页码值 当前为1
    pagesize: 4,  // 每页显示的信息条数
    cate_id: '',
    state: ''
}
// 入口函数
$(function () {
    initCate();
    initTable();

    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        q.cate_id = $('[name="cate_id"]').val();
        q.state = $('[name="state"]').val();
        initTable();
    })

    // 删除功能
    $('tbody').on('click', '.btn-del', function () {
        var Id = $(this).parent().attr('data-id');
        // console.log(Id);
        $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + Id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                initTable();
            }
        })
    })


})

// 获取筛选区域文章分类信息的函数
function initCate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // layui.layer.msg(res.message);
            var htmlStr = template('tpl1', res);
            // $('[name="cate_id"]').html(htmlStr);
            $('select').eq(0).html(htmlStr);
            // 通过 layui 重新渲染表单区域的UI结构
            layui.form.render();
        }
    })
}

// 获取文章列表区域的信息的函数
function initTable() {
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function (res) {
            // 当前页面的数据删除完之后 应该回到上一页
            if (res.data.length === 0 && q.pagenum > 1) {
                q.pagenum--;
                initTable();
                return;
            }
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            var htmlStr = template('tpl2', res);
            $('tbody').html(htmlStr);

            // 文章列表获取完成后，渲染底部分页功能
            layui.laypage.render({
                elem: 'page-area',//注意，这里的 page-area 是 ID，不用加 # 号
                count: res.total, //数据总数，从服务端得到
                limit: q.pagesize, // 每页显示的条数
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 4, 6, 8, 10],
                curr: q.pagenum,
                jump: function (obj, first) {
                    if (!first) {
                        // console.log(obj);
                        q.pagenum = obj.curr;
                        q.pagesize = obj.limit;
                        initTable();
                    }
                }
            })
        }
    })
} 