$(function () {
    // 给去注册按钮设置点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 给去登录按钮设置点击事件
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 自定义验证规则
    var form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致！'
            }
        }
    })
    // 设置提交事件
    var layer = layui.layer
    // 注册表单提交
    $('#form_reg').submit(function (e) {
        // 阻止默认跳转
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('注册成功、请登录！', { icon: 6 })
                // 自动进行点击事件
                $('#link_login').click()
                // 重置form表单
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录表单
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜你，登录成功', { icon: 6 })
                // 把 token 存到本地 留到后台页面用
                localStorage.setItem('token', res.token)
                // 跳转页面
                location.href = "/index.html"
            }
        })
    })
})