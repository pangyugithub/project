  $(function () {
    // 现用户点击搜索按钮跳转到搜索结果页面
    //   1.给搜索按钮添加点击事件
    //   2.获取用户输入的关键字
    //   3.判断用户是否输入了搜索关键字
    //   4.如果用户没有输入关键字，则阻止跳转，并且给出提示
    //   5.如果用户输入了则跳转到搜索结果页面
       $("#search-btn").click(function () {
        // 用户输入的搜索关键字
        var keyword= $(this).siblings("input").val();
        //判断用户是否输入了搜索关键字
        if (!keyword){
            mui.toast("请输入要搜索的关键字");
        }else {
            keyArr.push(keyword);// 将用户输入的关键字储存在数组中
            localStorage.setItem('keyArr',JSON.stringify(keyArr)); //将关键字数组储存在本地
            location.href = 'search-result.html?keyword='+keyword;
        }
    });

    //实现历史关键字储存
    //    1.准备一个储存关键字的数组
    //    2.当用户点击搜索按钮的时候，将用户输入的关键字追加到数组里
    //    3.将数组储存在本地储存中
    //    4.在页面一上来的时候判断本地储存中是否有已经储存的关键字
    //    5.将数据和html拼接，将数据展示在页面中
        var keyArr=[];
        if (localStorage.getItem("keyArr")){
            keyArr = JSON.parse(localStorage.getItem('keyArr'));
            var html=template("historyTpl",{
                result:keyArr
            })
           $("#history-box").html(html);
        }

        // 实现清空历史功能
        //   1.给元素添加点击事件
        //   2.清空页面中的数据，清除本地储存中的数据
        $("#clearHistory").click(function () {
            $("#history-box").html("");
            localStorage.clear("keyArr");
        })
  });
