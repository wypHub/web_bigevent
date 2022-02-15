layui.form.verify({
    nickname: [
        /^[\S]{1,6}$/
        , '用户名必须是1~6位之间，且不能出现空格'
    ]

});

$(function () {
    initUserInfo();
    // 更新ajax请求
    $('#form1').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return '更新信息失败！'
                }
                layui.layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    })
    // 表单重置效果
    $('#reset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
})
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // console.log(res);
            layui.form.val('formUserInfo', res.data)
        }
    })

}