$(function () {
    // 库存数量
    var kucunNum = 0;
    // 尺码
    var size = null;

    var productId = 0;
    //从地址栏获得产品id
    var id = getParamsByUrl(location.href,'id');


    //通过接口请求数据
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function (res) {
            var html = template('productTpl',res);
            $('#product-box').html(html);


            //初始化轮播图片插件，使轮播重新生效
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });

    //采用事件委托来添加事件，直接从模版引擎里选取span元素是选不到的，那么则通过其父级实现
    $('#product-box').on('tap','.size span',function () {
            $(this).addClass('active').siblings('span').removeClass('active');
            // 用户选择的尺码
            size = $(this).html();
    });

    // 加号减号
    var oInp = $('#inp');

    $('#increase').on('tap',function(){

        var num = oInp.val();

        num++;

        if(num > kucunNum){
            num = kucunNum;
        }

        oInp.val(num);

    });

    $('#reduce').on('tap', function(){

        var num = oInp.val()

        num--;

        if(num < 1){
            num = 1;
        }

        oInp.val(num);

    });


    /**
     * 加入购物车
     * 1.获取加入购物车按钮 并添加点击事件
     * 2.判断用户是否选择了尺码
     * 3.调用加入购物车接口
     * 4.提示用户 加入购物车成功 是否跳转到购物车页面
     */

    $('#addCart').on('tap', function(){

        if(!size){

            mui.toast('请选择尺码');

            return;

        }

        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num: kucunNum,
                size: size
            },
            success: function(res){

                if(res.success){

                    mui.confirm("加入购物车成功,跳转到购物车?", function(message){

                        if(message.index){

                            // 跳转到购物车
                            location.href = "cart.html";

                        }

                    })

                }

            }
        });

    });

});
