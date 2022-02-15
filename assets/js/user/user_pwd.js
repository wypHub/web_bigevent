layui.form.verify({
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
        if (value === $('[name="oldPwd"]').val()) {
            return '不能与旧密码相同！'
        }
    },
    rePwd: function (value) {
        if (value !== $('[name="newPwd"]').val()) {
            return '新密码输入不一致！'
        }
    }
})

$(function () {
    $('#form1').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                $('#form1')[0].reset();
            }
        })
    })
})