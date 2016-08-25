
//新版jquery不支持$.browser.version ; 兼容性处理
(function(jQuery){
    if(jQuery.browser) return;
    jQuery.browser = {};
    jQuery.browser.mozilla = false;
    jQuery.browser.webkit = false;
    jQuery.browser.opera = false;
    jQuery.browser.msie = false;
    var nAgt = navigator.userAgent;
    jQuery.browser.name = navigator.appName;
    jQuery.browser.fullVersion = ''+parseFloat(navigator.appVersion);
    jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;
// In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        jQuery.browser.opera = true;
        jQuery.browser.name = "Opera";
        jQuery.browser.fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
    }
// In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        jQuery.browser.msie = true;
        jQuery.browser.name = "Microsoft Internet Explorer";
        jQuery.browser.fullVersion = nAgt.substring(verOffset+5);
    }
// In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        jQuery.browser.webkit = true;
        jQuery.browser.name = "Chrome";
        jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
    }
// In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        jQuery.browser.webkit = true;
        jQuery.browser.name = "Safari";
        jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
    }
// In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        jQuery.browser.mozilla = true;
        jQuery.browser.name = "Firefox";
        jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
    }
// In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
        (verOffset=nAgt.lastIndexOf('/')) )
    {
        jQuery.browser.name = nAgt.substring(nameOffset,verOffset);
        jQuery.browser.fullVersion = nAgt.substring(verOffset+1);
        if (jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()) {
            jQuery.browser.name = navigator.appName;
        }
    }
// trim the fullVersion string at semicolon/space if present
    if ((ix=jQuery.browser.fullVersion.indexOf(";"))!=-1)
        jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);
    if ((ix=jQuery.browser.fullVersion.indexOf(" "))!=-1)
        jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);
    jQuery.browser.majorVersion = parseInt(''+jQuery.browser.fullVersion,10);
    if (isNaN(jQuery.browser.majorVersion)) {
        jQuery.browser.fullVersion = ''+parseFloat(navigator.appVersion);
        jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
    }
    jQuery.browser.version = jQuery.browser.majorVersion;
})(jQuery);




(function ($) {

//放大缩小图片
    function imgToSize(size) {
        var iw = $('.jcrop_w>img').width(),
            ih = $('.jcrop_w>img').height(),
            _data = $(".jc-demo-box").attr("data"),
            _w = Math.round(iw + size),
            _h = Math.round(((iw + size) * ih) / iw);

        if(($.browser.version == 8.0 || $.browser.version == 7.0 || $.browser.version == 6.0) && (_data == 90 || _data == 270)){
            $('.jcrop_w>img').width(_h).height(_w);
        }else{
            $('.jcrop_w>img').width(_w).height(_h);
        }

        var     fiw = $('.jcrop_w>img').width(),
            fih = $('.jcrop_w>img').height(),
            ow = (395 - fiw) / 2,
            oh = (340 - fih) / 2,
            cx = $("#small").position().left,
            cy = $("#small").position().top,
            rx = 110 / $("#small").width(),
            ry = 135 / $("#small").height(),
            rx1 = 73 / $("#small").width(),
            ry1 = 90 / $("#small").height(),
            rx2 = 40 / $("#small").width(),
            ry2 = 48 / $("#small").height();

        if(($.browser.version == 8.0 || $.browser.version == 7.0 || $.browser.version == 6.0) && (_data == 90 || _data == 270)){
            pre_img2($('.pre-1 img'), rx, fih, ry, fiw, cx, cy, ow, oh);
            pre_img2($('.pre-2 img'), rx1, fih, ry1, fiw, cx, cy, ow, oh);
            pre_img2($('.pre-3 img'), rx2, fih, ry2, fiw, cx, cy, ow, oh);
        }else{
            pre_img2($('.pre-1 img'), rx, fiw, ry, fih, cx, cy, ow, oh);
            pre_img2($('.pre-2 img'), rx1, fiw, ry1, fih, cx, cy, ow, oh);
            pre_img2($('.pre-3 img'), rx2,  fiw, ry2, fih, cx, cy, ow, oh);
        }
        $(".jcrop_w img").css({
            left: ow,
            top: oh
        });

    };
    function pre_img2(obj, rx, iw, ry, ih, cx, cy, ow, oh) {
        obj.css({
            width: Math.round(rx * iw) + 'px',
            height: Math.round(ry * ih) + 'px'
        });
        if (cy >= oh && cx >= ow) {
            obj.css({
                marginLeft: '-' + Math.round(rx * (cx - ow)) + 'px',
                marginTop: '-' + Math.round(ry * (cy - oh)) + 'px'
            });
        } else if (cy <= oh && cx >= ow) {
            obj.css({
                marginLeft: "-" + Math.round(rx * (cx - ow)) + 'px',
                marginTop: Math.round(ry * (oh - cy)) + 'px'
            });
        } else if (cy >= oh && cx <= ow) {
            obj.css({
                marginLeft: Math.round(rx * (ow - cx)) + 'px',
                marginTop: '-' + Math.round(ry * (cy - oh)) + 'px'
            });
        } else if (cy <= oh && cx <= ow) {
            obj.css({
                marginLeft: Math.round(rx * (ow - cx)) + 'px',
                marginTop: Math.round(ry * (oh - cy)) + 'px'
            });
        }

    };
//默认图像位置
    function cutImage(obj) {
        var w = 400,
            h = 400,
            iw = $(obj).width(),
            ih = $(obj).height();


        if (iw > w || ih > h) {
            if (iw / ih > w / h) {
                obj.css({
                    width: w,
                    height: w * ih / iw,
                    top: (h - (w * ih / iw)) / 2,
                    left: 0
                });
            } else {
                obj.css({
                    height: h,
                    width: h * iw / ih,
                    top: 0,
                    left: (w - (h * iw / ih)) / 2
                });
            }
        } else {
            obj.css({
                left: (w - iw) / 2,
                top: (h - ih ) / 2
            });
        }
    }
    function showPreview(c) {
        var iw = $('.jcrop_w>img').width(),
            ih = $('.jcrop_w>img').height(),
            ow = (400 - iw) / 2,
            oh = (400 - ih) / 2,
            rx = 100 / c.w,
            ry = 100 / c.h,
            rx1 = 70 / c.w,
            ry1 = 70 / c.h,
            rx2 = 30 / c.w,
            ry2 = 30 / c.h,
            _data = $(".jc-demo-box").attr("data");

        if (($.browser.version == 8.0 || $.browser.version == 7.0 || $.browser.version == 6.0) && (_data == 90 || _data == 270)) {
            pre_img2($('.pre-1 img'), rx, ih, ry, iw, c.x, c.y, ow, oh);
            pre_img2($('.pre-2 img'), rx1, ih, ry1, iw, c.x, c.y, ow, oh);
            pre_img2($('.pre-3 img'), rx2, ih, ry2, iw, c.x, c.y, ow, oh);
        } else {
            pre_img2($('.pre-1 img'), rx, iw, ry, ih, c.x, c.y, ow, oh);
            pre_img2($('.pre-2 img'), rx1, iw, ry1, ih, c.x, c.y, ow, oh);
            pre_img2($('.pre-3 img'), rx2, iw, ry2, ih, c.x, c.y, ow, oh);
        }
        $('#x').val(c.x);
        $('#y').val(c.y);
        $('#w').val(c.w);
        $('#h').val(c.h);
    }

    function startJcrop() {
        //默认图像居中显示
        cutImage($(".jcrop_w>img"));

        var _Jw = ($("#target").width() - 100) / 2,
            _Jh = ($("#target").height() - 100) / 2,
            _Jw2 = _Jw + 100,
            _Jh2 = _Jh + 100;

        $('#target').Jcrop({
            setSelect: [_Jw, _Jh, _Jw2, _Jh2],
            onChange: showPreview,
            onSelect: showPreview,
            bgFade: true,
            bgColor: "white",
            aspectRatio: 1,
            bgOpacity: .5
        });

        $("#idBig").click(function(e){
            imgToSize(20);
            return false;
        });
        $("#idSmall").click(function(e){
            imgToSize(-20);
            return false;
        });

    }




    //调用绑定
    function preview(file, container) {
        var prevDiv = document.querySelector(container);
        if (file.files && file.files[0]) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
                $('.preview-container>div').append('<img src="' + evt.target.result + '" class="jcrop-preview jcrop_preview_s" />');
            }
            reader.readAsDataURL(file.files[0]);
        }
        else {
            prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
            $('.preview-container>div').append('<img src="' + evt.target.result + '" />');
        }
    }

    var $uploadContainer = $('.choose-photo'),
        $uploadImg = $('#upload-img');

    $uploadImg.on('change', function () {
        var This = this;
        /*        $uploadContainer.fadeOut(200, function () {
         preview(This,'#target');
         //            setTimeout(function () {
         //                console.log($(".jcrop_w > img").width())
         //            },1000)
         setTimeout(function () {
         startJcrop();
         },1000)

         //            console.log($(".jcrop_w > img").width())

         });*/
        
        $uploadContainer.fadeOut(1000, function () {
            preview(This, '#target');
            setTimeout(function () {
                startJcrop();

            }, 1000);
            $('#target').fadeIn(600);

        });

    })
    
    
})(jQuery);

