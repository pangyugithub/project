//获取地址兰用户输入的关键字(实际上就是获取的输入框里输入的内容)，它与操作DOM没关系，所以可以拿到函数外面不影响功能
//getParamsByUrl();这个函数是我们自己封装的获取地址栏关键字的函数，由于常用所以把它放入到了public.js中，其他js文件直接调用即可
var keyWord=getParamsByUrl(location.href,'keyword');
//当前页
var page=1;
//页面的数据
var html= "";
//默认价格排序
var priceSort=1;
//默认销量排序
var salesSort=1;
//this指向问题
var html=null;
$(function () {
    // 根基用户输入的关键字获取搜索结果
    //     1.获取地址栏中的用户搜索的搜索关键字
    //     2.用关键字调取搜索接口
    //     3.将搜索结果展示在页面中
    // var keyWord=getParamsByUrl(location.href,'keyword');
    // 上面这个变量需要提到函数外面去，要不然下面的ajax里用到的这个变量会导致页面报错，
    // 因为这里的keyword属于局部变量，只可以在函数内使用。
    mui.init({
        pullRefresh : {
            container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                //callback页面一上来的时候自动调用一次
                //当页面上拉到底部时候还会继续调用
            }
        }
    });

    //按照价格对商品进行排序
    //     1.对价格按钮添加轻敲事件
    //     2.将价格排序规则传递到接口中
    //     3.对之前的各种配置进行初始化
    //            清空页面中的数据
    //            恢复当前页的值为1
    //            重新开始上拉
    //     4.将排序后的结果重新排序在页面当中
    $('#priceSort').on('tap',function () {
            //更改价格排序条件
            priceSort=priceSort==1 ? 2:1;

            html = "";
            page=1;
            //pullup-container为在mui.init方法中配置的pullRefresh节点中的container参数；
            //注意：refresh()中需传入true
            mui('#refreshContainer').pullRefresh().refresh(true);
            //重新获取数据
            getData()
    });

    $('#salesSort').on('tap',function () {
        //更改价格排序条件
        salesSort=salesSort==1 ? 2:1;

        html = "";
        page=1;
        //pullup-container为在mui.init方法中配置的pullRefresh节点中的container参数；
        //注意：refresh()中需传入true
        mui('#refreshContainer').pullRefresh().refresh(true);
        //重新获取数据
        getData()
    })
});


function getData() {
    if (!This){
        This=this;
    }
    var This=this;
    $.ajax({
        url:'',
        type:'get',
        data:{
            page:page++,
            pageSize:4,
            proName:keyWord,
            price:priceSort,
            sales:salesSort
        },
        success:function (response) {
            if (response.data.length > 0){  //如果还有数据
                // var html=template('searchTpl',{response});
                html += template('searchTpl',response); //+=联同上一页的数据一并显示出来
                $('#search-box').html(html);
                //告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(false);
            }else {//否则
                //告诉上拉加载组件当前数据加载完毕,true没有更多数据
                This.endPullupToRefresh(true);
            }

        }
    });
}

