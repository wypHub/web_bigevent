// 初始化富文本编辑器
initEditor();

// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

$(function () {
    initCate();

    // 选择封面按钮
    $('#chooseImg').on('click', function () {
        $('#coverImg').click();
    })
    // 更换裁剪图片
    $('#coverImg').on('change', function () {
        if (this.files.length === 0) {
            return '请选择图片！';
        }
        var newImgURL = URL.createObjectURL(this.files[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 存为草稿按钮
    var state = '已发布';
    $('#draft').on('click', function () {
        state = '草稿';
    })
    // 监听表单提交事件

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(this);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                fd.append('state', state);
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    processData: false,
                    contentType: false,
                    data: fd,
                    success: function (res) {
                        // console.log(res);
                        if (res.status !== 0) {
                            return layui.layer.msg(res.message);
                        }
                        layui.layer.msg(res.message);
                        location.href = '/article/art_list.html';
                    }
                })
            })

    })

})

// 获取文章类别并渲染下拉选择框
function initCate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            var htmlStr = template('tpl', res);
            $('select').html(htmlStr);
            layui.form.render('select');
        }
    })
}