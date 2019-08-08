$(function () {

    // 获取用户储存的收货地址

    //存储收货地址数组
    var address = null;
    $.ajax({
        url:'/address/queryAddress',
        type:'get',
        success:function (res) {
            address = res;
            var html = template('addressTpl',{result:res});
            // console.log(html);
            $('#address-box').html(html);
        }
    });

    //删除收货地址
    //     1.给删除按钮添加点击事件
    //     2.弹出删除对话框，如果用户点击了确认，执行删除操作，反之，不执行
    //     3.调用删除收货地址的接口，完成删除功能
    //     4.刷新当前页面，重新获取收货列表地址
    //script标签中的dom元素利用jquery 选择器选不到的，所以script标签中的删除按钮是选不到的，那么利用事件委托来处理
    $('#address-box').on('tap','.mui-btn-red',function () {

        var id=this.getAttribute('data-id');

        var li = this.parentNode.parentNode;
        mui.confirm('确认要删除吗？','提示',function (message) {
            if (message.index==1){
                $.ajax({
                    url:'/address/deleteAddress',
                    type: 'post',
                    data:{
                        id:id
                    },
                    success:function (res) {
                        if (res.success){
                            // mui.toast('删除成功');
                            location.reload(); //重新加载页面
                        }else {
                            mui.swipeoutClose(li);
                        }
                    }
                })
            }
        });
    });



    //编辑收货地址
    //    1.给编辑按钮添加点击事件
    //    2.点击完后跳转到收货地址编辑页面 ，并且将编辑的数据传递到这个页面，并将数据展示在页面中
    //    3.给确认按钮添加点击事件，调用接口执行编辑操作，若编辑操作成功，则跳转到收货地址列表页面
    $('#address-box').on('tap','.mui-btn-warning',function () {

        var id=this.getAttribute('data-id');
        for (var i=1;i<address.length;i++){
            if (address[i].id==id) {
                localStorage.setItem('editAddress', JSON.stringify(address[i]));
                break; //终止循环
            };
            // 跳转到编辑页面
            location.href = 'addAddress.html?isEdit=1';
        }
    });


});
