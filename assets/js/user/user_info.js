// 入口函数
$(function() {
    // 调用获取用户信息函数
    getUserinfo();
    // 获取用户信息
    function getUserinfo() {
        // 发送ajax请求
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function(res) {
                // console.log(res);
                // 判断用户信息是否获取成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 将内容渲染到表单中
                layui.form.val('formUserInfo', res.data);
            }
        });
    }
    // 表单验证
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称不能超过6个字符!'
            }
        }
    });

    // 修改重置按钮行为
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        // 调用获取用户信息函数
        getUserinfo();
    });

    // 修改用户信息
    $('.layui-form').on('submit', function(e) {
        // 阻止默认提交事件
        e.preventDefault();
        // 获取表单数据
        var data = $(this).serialize();
        // console.log(data);
        // 调用接口发送ajax请求
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: data,
            success: function(res) {
                // console.log(res);
                // 判断信息是否修改成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 更新index界面中的欢迎语
                    window.parent.getUserInfo();
                })
            }
        });
    });
})