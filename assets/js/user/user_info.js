$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称只能设置 1 ~ 6 位数'
            }
        }
    })
    // 导出layer
    var layer = layui.layer
    // 用户渲染
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.massage)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置
    $('#btnReset').on('click', function (e) {
        // 清楚默认行为
        e.preventDefault()
        // 从新渲染
        initUserInfo()
    })
    // 修改数据
    $('.layui-form').on('submit', function (e) {
        // 清楚默认
        e.preventDefault()
        // 获取数据
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你用户名修改成功！')
                // 调用父级中的渲染
                window.parent.getUserInof()
            }
        })
    })
})
