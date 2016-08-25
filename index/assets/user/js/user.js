/**
 * Created by Administrator on 2016/7/10.
 */

(function ($) {

    function avatarPanelEvent() {
        var $avatarUpload = $('.avatar-upload-panel');
        //点击头像弹出上传头像面板
        $('#user-avatar').on('click',function () {
            $avatarUpload.slideDown();
        });

        //取消上传头像
        $('#avatar-upload-dismiss').on('click',function () {
            $avatarUpload.slideUp();
        })
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


    avatarPanelEvent();

})(jQuery);
