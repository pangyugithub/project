//下面这样写JQuery是当html结构加载完成后执行（延迟加载问题），原生js中为window.onload=function(){}
$(function () {
    //实现注册功能
//   1.给注册按钮田间点击事件
//   2.获取到用户的注册信息
//   3.对用户输入的信息做验证
//   4.如果用户输入的信息合法，则调用注册接口实现注册功能
//   5.给出提示告诉用户注册是否成功
//   6.跳转到登录页面
    $('#register-btn').on('click',function () {
        var username=$("[name='username']").val();
        var mobile=$("[name='mobile']").val();
        var password=$("[name='password']").val();
        var againPass=$("[name='againPass']").val();
        var vCode=$("[name='vCode']").val();
        // var val=[username,mobile,password,againPass,vCode];

        if (!username){
            // alert('用户名不能为空！');
            mui.toast("用户名不能为空！");
            return;
        };

        if (mobile.length<11){
            // alert('手机号不合法！请重新输入！');
            mui.toast("手机号不合法！请重新输入！");
            return;
        }

        if (password != againPass){
            // alert('两次输入的密码不一致，请重新输入！');
            mui.toast("两次输入的密码不一致，请重新输入！");
            return;
        }
        if (vCode.length<6){
            // alert('验证码有误！');
            mui.toast("验证码有误！");
            return;
        };

        $.ajax({
            url: '',
            type: 'post',
            data:{
                username:username,
                mobile:mobile,
                password:password,
                vCode:vCode
            },
            success:function (res) {
                // alert("注册成功！");
                mui.toast("注册成功！");
                setTimeout(function () {
                        location.href= "login.html";
                },1000);
            }
        });
    });


    //获取认证码
    //   1.给获取认证码按钮添加点击事件
    //   2.调用接口获取认证码
    //   3.将认证码输出到控制台（本应该是发送到手机号然后手机收到验证码再填入，由于这种方式收费所以这里就输出到控制台了）
    $('#getCode').on('click',function () {
        $.ajax({
            url:'',
            type:'get',
            success:function (res) {
                console.log(res.vCode);
            }
        })
    })
});
