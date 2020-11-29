$(function () {
    // 补零
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 时间过滤器
    template.defaults.imports.dateFormat = function (time) {
        var dr = new Date(time)

        var n = dr.getFullYear()
        var y = padZero(dr.getMonth() + 1)
        var r = padZero(dr.getDate())

        var nn = padZero(dr.getHours())
        var yy = padZero(dr.getMinutes())
        var rr = padZero(dr.getSeconds())
        return `${n}-${y}-${r} ${nn}:${yy}:${rr}`
    }
    // 获取 layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    // 定义提交参数
    var q = {
        pagenum: '1', //页码值
        pagesize: '2', // 每页显示多少数据
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的状态，可选值有：已发布、草稿
    }
    // 获取数据
    initTable()
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 分页
                renderPage(res.total)
            }
        })
    }
    // 初始化分类
    initCate()
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 赋值渲染
                var str = template('tpl-cate', res)
                $('[name=care-id]').html(str)
                // 重新渲染调用layUI
                form.render()
            }
        })
    }
    // 筛选
    $('#form-search').on('submit', function (e) {
        // 清楚默认
        e.preventDefault()
        // 获取到表单里面的值
        var cate_id = $('[name=care-id]').val()
        var state = $('[name=state]').val()
        // 赋值给q
        q.cate_id = cate_id
        q.state = state
        // 重新渲染
        initTable()
    })
    // 分页
    function renderPage(total) {
        // 获取 分页
        var laypage = layui.laypage
        laypage.render({
            elem: 'pageBox', // 容器 id名
            count: total, // 数据总数
            limit: q.pagesize, // 每页显示的条数
            curr: q.pagenum, // 起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // 
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 
                if (!first) {
                    initTable()
                }
            }
        })
    }
    // 删除按钮
    $("tbody").on('click', '.btn-delete', function () {
        // 获取id
        var id = $(this).attr('data-id')
        layer.confirm('确定删除文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你删除文章成功！')
                    if($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                    // 获取数据
                    initTable()
                    layer.close(index)
                }
            })

        });
    })
})