// 修改密码入口函数
$(function() {
    // 表单数据验证
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 定义新旧密码不一致规则
        somePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同!'
            }
        },
        // 定义两次密码一致规则
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致!'
            }
        }
    });
    // 修改密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // 获取表单数据
        var data = $(this).serialize();
        // console.log(data);
        // 调用接口发送ajax请求
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: data,
            success: function(res) {
                console.log(res);
                // 判断是否修改成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 清空表单
                    $('.layui-form')[0].reset();
                    // 清空本地token
                    localStorage.removeItem('token');
                    // 跳转登录界面
                    window.parent.location.href = '/login.html';
                });
            }
        });
    });

})