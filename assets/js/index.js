$(function () {
    getUserInfo();

    // 退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除本地token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });

    })
})

// 封装获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layui.layer.msg(res.message);
            renderAvatar(res.data);
        }
    })
}

// 封装一个渲染用户头像的函数
function renderAvatar(user) {
    // 获取用户昵称或用户名
    var name = user.nickname || user.username;
    // console.log(name);
    $('#welcome').html('欢迎&nbsp;&nbsp' + name).show();
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}