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
        afterCardChange: function(index) {
            if (index === 4) {
                $(".arrow").fadeOut();
            } else {
                $(".arrow").fadeIn();
            }
        }
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
    location.href = "daummaps://place?id=245466707";
    setTimeout(function() {
        if (location.href === "https://daehee-seoyeong.github.io") {
            location.href = "https://m.map.kakao.com/actions/searchView?q=%EB%B9%84%EB%A0%8C%ED%8B%B0#!/245466707/map/place";
        }
    }, 1000);
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
    var prevPage = (curPage - 1 == 0) ? 12 : curPage - 1;
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
    $(".photo-area-"+beforePage).css("display", "none");
    $(".photo-area-"+afterPage).css("display", "block");
    $(".indicator").text(afterPage + "/" + maxPage);
}

function preventScrollOnReplyList() {
    $(".reply-list table").on("touchstart", function(event) {
        event.stopPropagation();
    });
    $(".reply-list table").on("touchmove", function(event) {
        event.stopPropagation();
    });
}

function enableReplyFeature() {
    $(".firebaseui-container").remove();
    $(".sixth-content-inputgroup input").css("display", "inline-block");
    $(".sixth-content-inputgroup button").css("display", "inline-block");
    $(".sixth-content-inputgroup p").css("display", "block");
    $(".sixth-content-inputgroup p").text("Logged in as " + authResult.user.displayName);
}

function initializeFirebaseUi() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDife6sBB6zUnJ2Tkq9FBmyUd6PplkakgU",
        authDomain: "wedding-invitation-d73db.firebaseapp.com",
        databaseURL: "https://wedding-invitation-d73db.firebaseio.com",
        projectId: "wedding-invitation-d73db",
        storageBucket: "wedding-invitation-d73db.appspot.com",
        messagingSenderId: "444343261278",
        appId: "1:444343261278:web:9aad35bc6d2461bdb73ccf"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('.sixth-content-inputgroup', {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                console.log("signInSuccessWithAuthResult");
                console.dir(authResult);
                console.dir(redirectUrl);
                // const userUid       = authResult.uid;
                // const email         = authResult.email;
                // const displayName   = authResult.displayName;
                // const photoURL      = authResult.photoURL;
                // const lastLoginAt   = authResult.lastLoginAt;
                // const createdAt     = authResult.createdAt;
                window.authResult = authResult;
                enableReplyFeature();
                return false;
            },

            uiShown: function() {
                console.log('ui shown');
                $(".firebaseui-idp-text-long").text("로그인 후 메시지 남기기");
                // $(".firebaseui-idp-text-short").text("Google 로그인");
            },
        },
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
    });
}

function initializeFirebaseDB() {
    var repliesRef = firebase.database()
        .ref('replies')
        .once('value')
        .then(function(snapshot) {
            var html = [], h = -1;
            var replies = snapshot.val();
            snapshot.forEach(function(child) {
                var reply = child.val();

                html[++h] = '<tr><td><p class="reply-name">';
                html[++h] = reply.displayName;
                html[++h] = '</p><p class="reply-contents">';
                html[++h] = reply.contents;
                html[++h] = '</p></td></tr>';

                // html[++h] = '<tr><td class="reply-name">';
                // html[++h] = reply.displayName;
                // html[++h] = '</td><td class="reply-contents">';
                // html[++h] = reply.contents;
                // html[++h] = '</td></tr>';
            });
            $(".reply-list table tbody")[0].innerHTML = html.join('');
    });
}

function writeReply() {
    var contents = convertMsg($(".sixth-content-inputgroup input").val());
    if (contents == undefined || contents == '') {
        alert("내용을 입력해주세요");
        return;
    }

    var message = {
        displayName: authResult.user.displayName,
        contents: contents,
        createdAt: new Date().getTime()
    }
    firebase.database().ref('replies').push(message)
    .then(function() {
        initializeFirebaseDB();
        $(".sixth-content-inputgroup input").val('');
    });
}

function convertMsg (html) { 
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}