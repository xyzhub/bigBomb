$.ajaxPrefilter(function(option) {
    // console.log(option);
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    // 判断是否需要请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})