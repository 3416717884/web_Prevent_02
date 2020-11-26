$(function () {
    var baseURL = "http://ajax.frontend.itheima.net"
    $.ajaxPrefilter(function (params) {
        params.url = baseURL + params.url
        // 判断路径里面是否有/my/
        if (params.url.indexOf('/my/') !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 拦截所有响应 ， 判断身份认证信息
        params.complete = function (res) {
            if (res.responseJSON.status !== 0 && res.responseJSON.message === "身份认证失败！") {
                // 清空本地存储
                localStorage.removeItem('token')
                // 跳转页面
                location.href = '/login.html'
            }
        }
    })

})