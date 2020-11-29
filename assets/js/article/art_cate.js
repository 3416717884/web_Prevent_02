$(function () {
    // 获取数据函数
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return
                }
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }
    // 获取 layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    // 关闭层
    var indexAdd = null
    var indexEdit = null
    // 添加类别按钮
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '260px']
        });
    })
    // 点击提交到页面上
    $('body').on('submit', '#form-add', function (e) {
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你添加文章分类成功！')
                // 关闭层
                layer.close(indexAdd)
                // 获取数据函数
                initArtCateList()
            }
        })
    })
    // 点击编辑的弹出框
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
            area: ['500px', '260px']
        });
        // 把内容获取到修改表单里面
        var Id = $(this).attr('data-id')
        // console.log(Id);
        // 发送Ajax
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                form.val('form-edit', res.data)
            }
        })
    })
    // // 点击提交到页面上 (修改)
    $('body').on('submit', '#form-edit', function (e) {
        // 清楚默认
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你更新文章分类成功！')
                // 获取数据函数
                initArtCateList()
                // 关闭层
                layer.close(indexEdit)
            }
        })
    })
    // 删除文章
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).siblings('.btn-edit').attr('data-id')
        // console.log(Id);
        layer.confirm('确定删除文件?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除文章成功！')
                    // 获取数据函数
                    initArtCateList()
                    layer.close(index);
                }
            })
        });
    })
})