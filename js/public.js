$(function () {
   //恢复a元素的跳转
    $('body').on('tap','a',function () {
        mui.openWindow({
            url:$(this).attr('href')
        })
    })
});

// 获取地址栏中的参数 -->  getParamsByUrl(location.href,'keyword');
//   1.地址字符串 url{string}
//   2.要获取的参数的名称 name{string} 调用时参数名称一定要传一个字符串 即'params'
//   3.返回(return)参数名称对应的参数值 value
function getParamsByUrl(url,name) {
    // 1.获取字符串中某一个字符的位置
    var str=url.indexOf('?'); //string.indexOf(searchvalue,start) searchvalue：必需。规定需检索的字符串值。start：可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 string Object.length - 1。如省略该参数，则将从字符串的首字符开始检索。
    var params=url.substr(str+1);//string.substr(start,length) start:必需。从0开始，要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。length:可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
    var param=params.split('&');  //split()分割出来是一个数组 如["keyword=1"，"name=2"，"age=18"]  split('&')是以&分割 split(' ')则是以空格分割
    for (var i=0;i<param.length;i++){
        var current=param[i].split('=');
        if (current[0]==name){
            return current[1];
        }
    }
    return  null;
};
