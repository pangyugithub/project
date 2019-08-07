var userInfo  = null; //保存的用户信息
//获取用户信息，并且处理用户未登录的问题
$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    async:false,  //使用同步加载
    success:function (res) {
        //用户没有登录
        if (res.error && res.error == 400){
            location.href = "index.html";
        }
        userInfo = res;
    }
});
//以上代码为什么放在$(function(){})外面呢，这和执行需求有关系，所以从$(function(){})取出放外面


$(function () {
    $('#logout').on('click',function () {
        $.ajax({
            url:'/user/logout',
            type:'get',
            success:function (res) {
                if (res.success){
                    mui.toast('退出登录成功！');
                    setTimeout(function () {
                        location.href = "index.html";
                    },2000);
                }
            }
        })

    });

    //获取用户信息，并且处理用户未登录的问题
    // $.ajax({
    //     url:'/user/queryUserMessage',
    //     type:'get',
    //     success:function (res) {
    //         if (res.error && res.error == 400){
    //                 location.href = "index.html";
    //         }
    //     }
    // });
    var html = template('userTpl',userInfo);
    $('#userInfoBox').html(html);

});
