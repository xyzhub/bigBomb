$.ajaxPrefilter(function(option) {
    // console.log(option);
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
})