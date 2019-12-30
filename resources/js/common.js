function openShuttle() {
    $(".fourth-content-detail").css("display", "none");
    $(".fourth-content-shuttle").css("display", "block");
}

function closeShuttle() {
    $(".fourth-content-shuttle").css("display", "none");
    $(".fourth-content-detail").css("display", "block");
}

function initializeCardSlider() {
    $('.my-slider').cardslider({
        // keyboard navigation
        keys: {
            next: 38,
            prev: 40
        },
    
        // 'up', 'down', 'right', 'left'
        direction: 'up',
    
        // shows navigation
        nav: false,
    
        // allows swipe event on touch devices
        swipe: true,
    
        // shows bottom pagination dots
        dots: false,
    
        // infinite loop
        loop: false,
    
        // callbacks
        beforeCardChange: null,
        afterCardChange: null
    });
}

function initializeDateStamp() {
    var dday = new Date("Feburay 1, 2020 00:00:00").getTime();//디데이
    var nowday = new Date();//현재
    nowday = nowday.getTime();//밀리세컨드 단위변환
    var distance = dday - nowday;//디데이에서 현재까지 뺀다.
    var d = Math.floor(distance / (1000 * 60 * 60 * 24));//일

    if (d > 0){
        $("#stamp").text("D-"+d);
    }
    else if (d == 0) {
        $("#stamp").text("D day");
    } else {
        $("#stamp").text("D+"+d);
    }
}

function preventDoubleTap() {
    (function($) {
        $.fn.nodoubletapzoom = function() {
            $(this).bind('touchstart', function preventZoom(e) {
                var t2 = e.timeStamp
                , t1 = $(this).data('lastTouch') || t2
                , dt = t2 - t1
                , fingers = e.originalEvent.touches.length;
                $(this).data('lastTouch', t2);
                if (!dt || dt > 500 || fingers > 1) return; // not double-tap

                e.preventDefault(); // double tap - prevent the zoom
                // also synthesize click events we just swallowed up
                $(this).trigger('click').trigger('click');
            });
        };
    })(jQuery);
}

function launchDaumMap() {
    try {
        location.href = "daummaps://place?id=245466707";
    } catch (e) {
        console.log(e);
    }
}

function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("주소가 복사되었습니다");
}

function prevImage() {
    var pageString = $(".indicator").text();
    var curPage = parseInt(pageString.split("/")[0]);
    var maxPage = parseInt(pageString.split("/")[1]);
    var prevPage = (curPage - 1 == 0) ? images.length : curPage - 1;
    switchImage(curPage, prevPage, maxPage);
}

function nextImage() {
    var pageString = $(".indicator").text();
    var curPage = parseInt(pageString.split("/")[0]);
    var maxPage = parseInt(pageString.split("/")[1]);
    var nextPage = (curPage + 1 > maxPage) ? 1 : curPage + 1;
    switchImage(curPage, nextPage, maxPage);
}

function switchImage(beforePage, afterPage, maxPage) {
    $(".photo-area-"+beforePage).css("background-size", "0 0");
    $(".photo-area-"+beforePage).css("height", "0");
    $(".photo-area-"+afterPage).css("background-size", "100% auto");
    $(".photo-area-"+afterPage).css("height", "calc(100% - 70px)");
    $(".indicator").text(afterPage + "/" + maxPage);
}