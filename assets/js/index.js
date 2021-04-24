// 首页入口函数
$(function() {
    // 调用用户数据函数
    getUserInfo();
    // 实现退出功能
    $('#logout').on('click', function() {
        // 弹出询问框
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            // 清除本地存储的token
            localStorage.removeItem('token');
            // 回到登录界面
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index);
        });
    });

})


// 定义获取用户数据
function getUserInfo() {
    // 调用接口
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function(res) {
            console.log(res);
            // 判断是否获取成功
            if (res.status !== 0) {
                return layui.lay.msg(res.message, { icon: 5 })
            }
            // 获取成功调用渲染头像函数
            renderAvatar(res.data);
        }
    });
}



// 定义渲染头像函数
function renderAvatar(data) {
    // console.log(data);
    // 优先获取用户的昵称,其次用户名
    var name = data.nickname || data.username;
    // 渲染欢迎语
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染头像区域
    // 判断是否有头像
    if (data.user_pic !== null) {
        // 有图片头像
        // 显示图片头像
        $('.layui-nav-img').attr('src', data.user_pic).show();
        // 隐藏文本头像
        $('.text-avatar').hide();
    } else {
        // 无图片头像
        // 获取用户名的首字母
        var firstCode = name[0].toUpperCase();
        // 显示文本头像
        $('.text-avatar').html(firstCode);
        // 隐藏图片头像
        $('.layui-nav-img').hide();

    }

}