$(function () {
    // 获取layer
    var form = layui.form
    // 表单规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码不能和原密码一样'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '俩次输入的密码不一致！'
            }
        }
    })
    // 获取 layer
    var layer = layui.layer
    // 提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            // {
            //     oldPwd : $('[name=oldPwd]').val(),
            //     newPwd : $('[name=newPwd]').val()
            // },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你修改密码成功！')
                // window.parent.location.href = '/login.html'
                $('.layui-form')[0].reset()
            }
        })
    })
})