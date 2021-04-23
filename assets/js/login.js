// 设置login模块的入口函数
$(function() {
    // 切换登录注册表单
    $('#link_reg,#link_login').on('click', function() {
        // 切换表单
        $('.login-box,.reg-box').toggle();
    })

    // 注册功能
    $('#form_reg').on('submit', function(e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 注册表单数据验证
        var form = layui.form;
        form.verify({
            // 密码规则
            pwd: [
                /^[\S]{6,12}$/,
                '密码必须6到12位，且不能出现空格'
            ],
            // 确定密码设置
            repwd: function(value, item) {
                // console.log(value, item);
                // 获取设置的密码
                var iptpwd = $('#form_reg [name=password]').val().trim();
                // console.log(iptpwd);
                // 判断两次密码是否一致
                if (value !== iptpwd) {
                    // return layui.layer.msg('两次密码不一致', { icon: 5 })
                    return '两次密码不一致'
                }
            }
        });
        // 获取输入的表单信息
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim(),
        };
        // console.log(data);
        // 发送ajax请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function(res) {
                console.log(res);
                // 判断是否注册成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 注册成功
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 调用切换表单函数,切换到登录表单
                    $('#link_login').click();
                })
            }
        });

    });

    // 登录功能
    $('#form_login').on('submit', function(e) {
        // 阻止默认事件
        e.preventDefault();
        // 获取表单数据
        var data = $(this).serialize();
        // 发送ajax请求
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: data,
            success: function(res) {
                console.log(res);
                // 判断是否登录成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 将token放入本地存储
                localStorage.setItem('token', res.token);
                // 登录成功
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 跳转到首页
                    location.href = '/index.html'
                })
            }
        });
    });

})