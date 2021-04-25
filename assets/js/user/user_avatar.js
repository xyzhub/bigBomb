// 更换头像入口函数
$(function() {
    // 插件实现图片截取
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };
    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 给上传按钮绑定点击事件
    // 实现选择图片上传
    $('#btnChooseImage').on('click', function() {
        // 触发file控件的点击事件
        $('#file').click();
    });
    // file绑定一个图片状态改变事件
    $('#file').on('change', function(e) {
        // console.log(e);
        // 获取选择的图片伪数组
        var fsList = e.target.files;
        // console.log(fsList);
        // 判断是否选择了图片
        if (fsList.length === 0) {
            return layui.layer.msg('请选择图片', { icon: 5 })
        };
        // 将选择的图片渲染到页面上
        // 获取用户选择的图片
        var file = fsList[0];
        // 依据选择的文件创建url地址
        var newImgURL = URL.createObjectURL(file);
        // 更新配置项
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });
    // 给确定按钮绑定点击事件
    $('#btnUpload').on('click', function() {
        // 获取选择图片的伪数组
        var fsList = $('#file')[0].files;
        // console.log(fsList);
        // 判断是否选择的图片
        if (fsList.length === 0) {
            return layui.layer.msg('请选择图片', { icon: 5 });
        }
        // 图片转化64位字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 调用接口发送ajax请求
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                // console.log(res);
                // 判断是否修改成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }

                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 更新index界面头像信息
                    window.parent.getUserInfo();
                })
            }
        });


    });
})