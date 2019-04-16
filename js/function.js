/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

// @prepros-prepend browserDetect.js


var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    touchDevice: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);
    }
};

function isLgWidth() {
    return $(window).width() >= TempApp.lgWidth;
} // >= 1200
function isMdWidth() {
    return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth;
} //  >= 992 && < 1200
function isSmWidth() {
    return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth;
} // >= 768 && < 992
function isXsWidth() {
    return $(window).width() < TempApp.smWidth;
} // < 768
function isIOS() {
    return TempApp.iOS();
} // for iPhone iPad iPod
function isTouch() {
    return TempApp.touchDevice();
} // for touch device


$(document).ready(function() {

    if (isIOS()) {
        $(function() {
            $(document).on('touchend', 'a', $.noop)
        });
    }


    $('[href*="#"]').click(function(event) {
        event.preventDefault();
    });

    $('.nav a[href^="#"]').click(function() {
        var scroll_el = $(this).attr('href');
        if (scroll_el == '#') {
            return false;
        }
        if ($(scroll_el).length != 0) {
            $('.header__right').removeClass('open');
            $('html, body').animate({
                scrollTop: $(scroll_el).offset().top
            }, 500);
        }
        return false;
    });

    $('.team__slider, .advisors__slider').slick({
        slidesToShow: 3,
        prevArrow: '<i class="icon-prev slick-prev"></i>',
        nextArrow: '<i class="icon-next slick-next"></i>',
        focusOnSelect: true,
        centerMode: true,
        centerPadding: '0',
        variableWidth: false,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                centerMode: false,
                dots: true,
                arrows: false
            }
        }]
    })

    checkOnResize();

    if (!isXsWidth()) {
        parallaxMove();
    }

    $('.mobile__toggle').on('click', function() {
        $('.header__right').toggleClass('open');
    });


});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) {
        return;
    }
    TempApp.resized = windowWidth;

    checkOnResize();

});

function checkOnResize() {
    fontResize();
}

function fontResize() {
    var windowWidth = $(window).width();
    if (!isXsWidth()) {
        var fontSize = windowWidth / 19.05;
    } else {
        var fontSize = windowWidth / 6;
    }
    $('body').css('fontSize', fontSize + '%');
}

$(function() {
    if ($(".js_youtube")) {
        $(".js_youtube").each(function() {
            $(this).append($('<span class="video__play"></span>'));
        });

        $('[data-target="#videoModal"]').on('click', function() {
            var wrap = $('#videoModal').find('.js_youtube');
            var videoId = $(this).attr('data-video');
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
            })

            wrap.append(iframe);

        });

        $('#videoModal').on('hide.bs.modal', function() {
            $(this).find('iframe').remove();
        });
    }

});

// TweenMax.min.js
// data - animate - wrap - обертка с плавающими блоками
// data-animate-x - блок движется по оси Х
// data-animate-xy - блок движется по обеим осям
function parallaxMove() {

    var mousePos;

    document.onmousemove = handleMouseMove;
    setInterval(getMousePosition, 100); // setInterval repeats every X ms

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0);
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }

    function getMousePosition() {
        var pos = mousePos;
        if (!pos) {
            // We haven't seen any movement yet
        } else {
            // Use pos.x and pos.y
        }
    }

    $('[data-animate-wrap]').each(function() {
        var container = $(this),
            elR = container.find('[data-animate-r]'),
            elX = container.find('[data-animate-x]'),
            elXY = container.find('[data-animate-xy]');

        var offset = $(this).offset();

        $(this).on('mousemove', function(e) {


            var sxPos = e.pageX / container.width() * 100 - 100;
            var syPos = (e.pageY - offset.top) / container.height() * 100 - 100;

            elX.each(function() {
                TweenMax.set([elX], {
                    transformStyle: "preserve-3d"
                });
                xSpeed = elX.attr('data-animate-x');
                TweenMax.to($(this), 2, {
                    rotationY: xSpeed * sxPos,
                    rotationX: 0 * syPos,
                    transformPerspective: 500,
                    transformOrigin: "center center -400",
                    ease: Expo.easeOut,
                });
            });

            elR.each(function() {
                TweenMax.set([elX], {
                    transformStyle: "preserve-3d"
                });
                xSpeed = elR.attr('data-animate-r');
                // console.log(mousePos.x);
                if (mousePos) {
                    mPos = mousePos.x - ($(window).width() / 2);
                } else {
                    mPos = 0;
                }
                TweenMax.to($(this), 2, {
                    rotationY: mPos / xSpeed,
                    rotationX: 0 * syPos,
                    transformPerspective: 500,
                    transformOrigin: "center center -400",
                    ease: Expo.easeOut,
                });
            });

            elXY.each(function() {
                xySpeed = $(this).attr('data-animate-xy');
                smooth = 5;
                TweenMax.to($(this), smooth, {
                    transformPerspective: 500,
                    css: {
                        transform: 'translateX(' + (e.pageX / container.width() * xySpeed - xySpeed) + 'em) translateY(' + ((e.pageY - offset.top) / container.height() * xySpeed - xySpeed) + 'em)'
                    },
                    ease: Expo.easeOut,
                });
            });

        });
    });
}