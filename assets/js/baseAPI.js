$.ajaxPrefilter(function(option) {
    // console.log(option);
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    // 判断是否需要请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    option.complete = function(res) {
        // 优化用户登录权限
        // 为了防止多次写入将其放到baseApI中的ajaxPrefilter函数中
        // console.log(res);
        // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            // 强制清空本地存储的token
            localStorage.removeItem('token');
            // 强制将页面跳转回登录界面
            location.href = '/login.html'
        }
    }
})