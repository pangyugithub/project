$(function () {
   //恢复a元素的跳转
    $('body').on('tap','a',function () {
        mui.openWindow({
            url:$(this).attr('href')
        })
    })
});

// 获取地址栏中的参数
//   1.地址字符串
//   2.要获取的参数的名称，返回参数名称对应的参数值
function getParamsByUrl(url,name) {
    // 1.获取字符串中某一个字符的位置
    var str=url.indexOf('?');

    var params=url.substr(str+1);
    var param=params.split('&');
    for (var i=0;i<param.length;i++){
        var current=param[i].split('=');
        if (current[0]==name){
            return current[1];
        }
    }
    return  null;
};
