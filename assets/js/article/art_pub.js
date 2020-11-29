$(function () {
    // 获取 layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 重新渲染 layUI
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 上传
    $('#btnChooseImage').on('click', function () {
        // 触发上传
        $('#coverfile').click()
    })
    // 文件改变事件
    $('#coverfile').change(function (e) {
        // 获取到文件列表
        var files = e.target.files[0]
        // 非空效验
        if (files == undefined) {
            return
        }
        // 根据文件 创建路径
        var newImgURL = URL.createObjectURL(files)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    var state = '已发布'
    $('#btnSava2').on('click', function () {
        state = '草稿'
    })
    // 添加文章
    $('#form_pub').on('submit', function (e) {
        // 清楚默认
        e.preventDefault()
        // 创建 一个 formData
        var fd = new FormData(this)
        fd.append('state', state)
        // 获取图片头像大小
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // console.log(...fd);
                // 发送ajax必须在toBlob里面
                publishArticle(fd)
            })
    })
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你添加文章成功！')
                // location.href = '/article/art_list.html'
                setTimeout(() => {
                    window.parent.document.querySelector('#art_list').click()
                }, 1000);
            }
        })
    }
})