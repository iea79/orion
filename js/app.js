function isLgWidth() {
    return $(window).width() >= TempApp.lgWidth;
}

function isMdWidth() {
    return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth;
}

function isSmWidth() {
    return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth;
}

function isXsWidth() {
    return $(window).width() < TempApp.smWidth;
}

function isIOS() {
    return TempApp.iOS();
}

function isTouch() {
    return TempApp.touchDevice();
}

function checkOnResize() {
    fontResize();
}

function fontResize() {
    var e = $(window).width();
    if (isXsWidth()) t = e / 6; else var t = e / 19.05;
    $("body").css("fontSize", t + "%");
}

function parallaxMove() {
    var d;
    document.onmousemove = function(e) {
        var t, i, n;
        null == (e = e || window.event).pageX && null != e.clientX && (i = (t = e.target && e.target.ownerDocument || document).documentElement, 
        n = t.body, e.pageX = e.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), 
        e.pageY = e.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), 
        d = {
            x: e.pageX,
            y: e.pageY
        };
    }, setInterval(function() {}, 100), $("[data-animate-wrap]").each(function() {
        var n = $(this), r = n.find("[data-animate-r]"), o = n.find("[data-animate-x]"), a = n.find("[data-animate-xy]"), s = $(this).offset();
        $(this).on("mousemove", function(e) {
            var t = e.pageX / n.width() * 100 - 100, i = (e.pageY - s.top) / n.height() * 100 - 100;
            o.each(function() {
                TweenMax.set([ o ], {
                    transformStyle: "preserve-3d"
                }), xSpeed = o.attr("data-animate-x"), TweenMax.to($(this), 2, {
                    rotationY: xSpeed * t,
                    rotationX: 0 * i,
                    transformPerspective: 500,
                    transformOrigin: "center center -400",
                    ease: Expo.easeOut
                });
            }), r.each(function() {
                TweenMax.set([ o ], {
                    transformStyle: "preserve-3d"
                }), xSpeed = r.attr("data-animate-r"), mPos = d ? d.x - $(window).width() / 2 : 0, 
                TweenMax.to($(this), 2, {
                    rotationY: mPos / xSpeed,
                    rotationX: 0 * i,
                    transformPerspective: 500,
                    transformOrigin: "center center -400",
                    ease: Expo.easeOut
                });
            }), a.each(function() {
                xySpeed = $(this).attr("data-animate-xy"), smooth = 5, TweenMax.to($(this), smooth, {
                    transformPerspective: 500,
                    css: {
                        transform: "translateX(" + (e.pageX / n.width() * xySpeed - xySpeed) + "em) translateY(" + ((e.pageY - s.top) / n.height() * xySpeed - xySpeed) + "em)"
                    },
                    ease: Expo.easeOut
                });
            });
        });
    });
}

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version", 
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t].string, n = e[t].prop;
            if (this.versionSearchString = e[t].versionSearch || e[t].identity, i) {
                if (-1 != i.indexOf(e[t].subString)) return e[t].identity;
            } else if (n) return e[t].identity;
        }
    },
    searchVersion: function(e) {
        var t = e.indexOf(this.versionSearchString);
        if (-1 != t) return parseFloat(e.substring(t + this.versionSearchString.length + 1));
    },
    dataBrowser: [ {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Internet Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "IOS"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    } ],
    dataOS: [ {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    } ]
};

BrowserDetect.init();

var browserName = BrowserDetect.browser.toLowerCase();

browserName ? "flex" in document.documentElement.style ? document.documentElement.setAttribute("data-browser", "flexible " + browserName) : document.documentElement.setAttribute("data-browser", "not-flex " + browserName) : "flex" in document.documentElement.style ? document.documentElement.setAttribute("data-browser", "flexible") : document.documentElement.setAttribute("data-browser", "not-flex");

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: !1,
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    touchDevice: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);
    }
};

$(document).ready(function() {
    isIOS() && $(function() {
        $(document).on("touchend", "a", $.noop);
    }), $('[href*="#"]').click(function(e) {
        e.preventDefault();
    }), $('.nav a[href^="#"]').click(function() {
        var e = $(this).attr("href");
        return "#" == e || 0 != $(e).length && ($(".header__right").removeClass("open"), 
        $("html, body").animate({
            scrollTop: $(e).offset().top
        }, 500)), !1;
    }), $(".team__slider, .advisors__slider").slick({
        slidesToShow: 3,
        prevArrow: '<i class="icon-prev slick-prev"></i>',
        nextArrow: '<i class="icon-next slick-next"></i>',
        focusOnSelect: !0,
        centerMode: !0,
        centerPadding: "0",
        variableWidth: !1,
        responsive: [ {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                centerMode: !1,
                dots: !0,
                arrows: !1
            }
        } ]
    }), checkOnResize(), isXsWidth() || parallaxMove(), $(".mobile__toggle").on("click", function() {
        $(".header__right").toggleClass("open");
    });
}), $(window).resize(function(e) {
    var t = $(window).width();
    TempApp.resized != t && (TempApp.resized = t, checkOnResize());
}), $(function() {
    $(".js_youtube") && ($(".js_youtube").each(function() {
        $(this).append($('<span class="video__play"></span>'));
    }), $('[data-target="#videoModal"]').on("click", function() {
        var e = $("#videoModal").find(".js_youtube"), t = $(this).attr("data-video"), i = $("<iframe/>", {
            frameborder: "0",
            src: "https://www.youtube.com/embed/" + t + "?autoplay=1&autohide=1"
        });
        e.append(i);
    }), $("#videoModal").on("hide.bs.modal", function() {
        $(this).find("iframe").remove();
    }));
});
//# sourceMappingURL=app.js.map