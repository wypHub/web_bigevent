$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 自定义表单验证

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var value1 = $('.reg-box [name="password"]').val();
            if (value !== value1) {
                return '两次密码输入不一致！';
            }
        }
    });

    // 监听表单注册事件 发起ajax请求
    $('.reg-box form').on('submit', function (e) {
        e.preventDefault();
        var username = $('.reg-box [name="username"]').val();
        var password = $('.reg-box [name="password"]').val();
        // console.log(username, password);
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message + '请登录！');
                // 跳转到登录页面
                $('#link_login').click();
            }
        })
    })

    // 监听表单登录事件 发起ajax请求
    $('.login-box form').submit(function (e) {
        e.preventDefault();
        // console.log($(this).serialize());
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message);
                // 将token凭证进行本地存储  以便后续使用
                localStorage.setItem('token', res.token);
                // 登录成功之后跳转到首页
                location.href = '/index.html';
            }
        })
    })
})