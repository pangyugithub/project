$(function () {
    $.ajax({
        url:'/address/queryAddress',
        type:'get',
        success:function (res) {
            var html = template('addressTpl',{result:res});
            // console.log(html);
            $('#address-box').html(html);
        }
    })
});
