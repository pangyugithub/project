$(function () {
    //修改密码
    //     1.获取修改密码按钮并添加点击事件
    //     2.获取用户输入的信息
    //     3.对用户输入的信息做校验
    //     4.调用修改密码接口，实现修改密码功能
    //     5.如果校验成功则跳转到登录页面
    $('#modify-btn').on('tap', function () {
        //原密码
        var originPass = $.trim($("[name='originPass']").val());
        //新密码
        var newPass = $.trim($("[name='newPass']").val());
        //确认新密码
        var confirmNewPass = $.trim($("[name='confirmNewPass']").val());
        //认证码
        var vCode = $.trim($("[name='vCode']").val());

        if (!originPass) {
            // alert('用户名不能为空！');
            mui.toast("请输入原密码");
            return;
        }
        ;

        if (!newPass) {
            // alert('手机号不合法！请重新输入！');
            mui.toast("请输入新密码");
            return;
        }
        ;
        if (!confirmNewPass) {
            // alert('手机号不合法！请重新输入！');
            mui.toast("请确认新密码");
            return;
        }

        if (newPass != confirmNewPass) {
            // alert('两次输入的密码不一致，请重新输入！');
            mui.toast("两次输入的密码不一致，请重新输入！");
            return;
        }
        ;
        if (vCode.length < 6) {
            // alert('验证码有误！');
            mui.toast("验证码有误！");
            return;
        }
        ;
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function (res) {
                mui.toast("密码修改成功！");
                setTimeout(function () {
                    location.href = 'login.html'
                }, 2000)
            }
        });


    });


    //获取验证码
    $('#getCode').on('tap', function () {
        $.ajax({
            url: '',
            type: 'get',
            success: function (res) {
                console.log(res.vCode);//将验证码输出到控制台,实际这一步需要付费发送到手机
            }
        })

    });
});
