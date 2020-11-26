$(function () {
    // 获取信息
    getUserInof()
    // 退出
    $('#logout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInof() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 替换用户名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 替换头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
    }
}
