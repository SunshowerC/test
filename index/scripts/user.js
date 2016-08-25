/**
 * Created by Administrator on 2016/7/10.
 */

/*

 //模板数据填充
 function tpl(id,data){
 var html=document.getElementById(id).innerHTML;
 var result="var p=[];with(obj){p.push('"
 +html.replace(/[\r\n\t]/g," ")
 .replace(/<%=(.*?)%>/g,"');p.push($1);p.push('")
 .replace(/<%/g,"');")
 .replace(/%>/g,"p.push('")
 +"');}return p.join('');";
 var fn=new Function("obj",result);
 return fn(data);
 }

 var user = {
 'name': '没锁定',
 'avatar': 'assets/img/640.png',
 'coin': 10
 }

 $(".user-info").html( tpl("user-info", user) );

 */

(function ($) {

    var user = {
        'name': '没锁定',
        'avatar': 'assets/img/640.png',
        'coin': 10
    }

    function tpl(id, data) {
        var html = document.getElementById(id).innerHTML;
        var result = ";var p=[];with(obj){p.push('"
            + html.replace(/[\r\n\t]/g, " ")
                .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
                .replace(/<%/g, "');")
                .replace(/%>/g, "p.push('")
            + "');}return p.join('');";
        console.log(result)
        var fn = new Function("obj", result);
        console.log(fn)
        return fn(data);
    }


    var $usrInfo = $('#user-detail').find('.form-group :input'),
        $nav = $('.user-post-nav,.user-panel-nav');

    $('a').addClass('transition');

    //默认不可编辑
    $usrInfo.prop('disabled', 'true');
    $('#btn-modify').on('click', function () {
        $usrInfo.removeAttr('disabled');
    });


    //清除不同导航栏的active样式
    $nav.on('click', 'a', function (e) {
        var target = e.target;
        if (target.tagName.toLocaleLowerCase() == 'a' &&
            target.className != 'active') {
            $nav.children('li').removeClass('active');
            /*
             //请求帖子数据
             if (target.id.indexOf('user')) {
             $.post('url',{
             post: 'all'
             },function (data) {
             console.log(data);
             });
             }*/
        }

    });

    /*
     //    提交修改信息
     $('#info-submit').on('click',function(e){
     $.post(url,$('#user-detail').serialize(),function(data){
     console.log(data);
     } )
     e.preventDefault();
     })
     */

//    右下帖子面板事件交互

    var $tabWrap = $('#tab-wrap');
    $tabWrap.on('click','a',function () {
        if($(this).is('.btn-sure')){
            $ensurePanel.slideDown();
        }
    })



//   确定任务人面板交互事件

    var $ensurePanel = $('#ensure-mission');
    var $missionAvatar = $ensurePanel.find('figure');
    $ensurePanel.on('click', 'figure,a,button', function (e) {
        if ($(this).is('figure')) {
            $missionAvatar.removeClass('active');
            $(this).toggleClass('active');
        }
        
        if($(this).data('triggle') === 'dismiss' ) {
            $ensurePanel.slideUp();
        }
    });



//    分页系统事件
    $('#post-page').bootstrapPaginator({
        alignment: "center",
        currentPage: 5,
        totalPages: 10,
        numberOfPages: 5,
        bootstrapMajorVersion:3,
        onPageChanged : function (event, oldpage, newpage) {
            console.log(event,oldpage,newpage);
        }
    })


})(jQuery);
