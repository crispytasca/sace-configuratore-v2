var current_slide = '';
$(window).on('load resize', function () {
    $('body').addClass('reveal');
    $.AutoScroll();
    $.PageTransitions();
    $.Hamburger();
    $.FixCenterContent();
    $.PrivacyExclusiveSelect();

    if ($(window).width() > 992) {
        $.TopDescription();
        $.scrollify.update();
    }
});


$(window).on('load', function () {
    $.PageNavigator();
    $.SetupScrollify();
    $.PageReload();

    $('.btn-red').click(function () {
        setTimeout(function () {
            $.scrollify.update();
        }, 300);
    })
});

$(window).on('resize scroll', function () {
    $.FixCenterContent();
});

$.PageReload = function () {
    $('.reload-page').click(function (e) {
        e.preventDefault();
        $('body').removeClass('reveal');
        setTimeout(function () {
            window.location.reload(true);
        }, 750);
    });
}

$.FixCenterContent = function () {
    $('.center-content').each(function () {
        var $wrapper = $(this);
        var $inner = $wrapper.children();
        if ($inner.length) {
            $inner = $inner.first();
            if ($inner.outerHeight() > $wrapper.height()) {
                $wrapper.height($inner.outerHeight() + 200);
            }
        }
    });
}

$.SetupScrollify = function () {
    if ($(window).width() > 992) {

        var url = window.location.href;
        if (url.indexOf('#') > 0) {
            $.scrollify({
                section: ".navigable",
                setHeights: false,
                scrollSpeed: 0,
            });
            setTimeout(function () {
                if ($('.step-1').length) {
                    $(animateHtmlOrBody()).animate({
                        scrollTop: $('.step-1').offset().top
                    });
                }
            }, 5000);
        }
        $.scrollify.destroy();

        $.scrollify({
            section: ".navigable",
            setHeights: false,
            scrollSpeed: 1500,
        });
        current_slide = $.scrollify.current();
    }
}

var t_out = 0;
$(window).on('resize scroll', function () {
    clearTimeout(t_out);
    t_out = setTimeout(function () {
        $.scrollify.update();
        current_slide = $.scrollify.current();
    }, 30);
});

$.Hamburger = function () {
    $('.hamburger').click(function () {
        $('#nav-icon').toggleClass('open');
        $('.main-menu').toggleClass('menu-open');
    });
}

$.AutoScroll = function () {
    $('a').each(function () {
        var $a = $(this);
        var href = $a.attr('href');
        $a.click(function (e) {
            if (href.indexOf('#') === 0 && $(href).length) {
                e.preventDefault();
                $(animateHtmlOrBody()).stop().animate({
                    scrollTop: $(href).offset().top
                }, 1500);
            }
        });
    });
}

$.PageNavigator = function () {
    var $navigable = $('.navigable').not('.navigable-not-indexed');
    var $navigator = $('.bullet-navigation');
    $navigable.each(function (i) {
        var $current = $(this);
        $current.addClass('navigable-' + i);
        if (i) {
            $navigator.append('<div class="bullet bullet-' + i + '"></div>');
        } else {
            $navigator.append('<div class="bullet bullet-' + i + ' selected"></div>');
        }
        var $bullet = $('.bullet-' + i);
        $bullet.click(function () {
            // $(animateHtmlOrBody()).stop().animate({
            //     scrollTop: $('.navigable-' + i).offset().top
            // }, 800);
            $.scrollify.move(i);
            $('.bullet').removeClass('selected');
            $bullet.addClass('selected');
        });
    });

    $(window).scroll(function () {
        $navigable.each(function (i) {
            if (window.pageYOffset + $('#header').height() >= $(this).offset().top) {
                $('.bullet').removeClass('selected');
                $('.bullet-' + i).addClass('selected');
            }
        });
    });
}


$.PageTransitions = function () {
    $('a').not('.no-body-fade').each(function () {
        $(this).click(function (e) {
            var $a = $(this);
            var href = $a.attr('href');
            if (href.indexOf('#') !== 0 && window.location.href.indexOf(href) < 0) {
                e.preventDefault();
                $(animateHtmlOrBody()).stop();
                $('body').removeClass('reveal');
                setTimeout(function () {
                    window.location.href = href;
                }, 800);
            }
        });
    })
}


$.TopDescription = function () {
    $(window).scroll(function () {
        var $top_description = $('.top-description');
        var delta_opacity = - window.pageYOffset / 100;
        delta_opacity = Math.max(delta_opacity, -1);
        var delta_translate = - window.pageYOffset / 10;
        delta_translate = Math.max(delta_translate, -20);
        $top_description.css({
            'opacity': 1 + delta_opacity,
            // 'transform': 'translateY(' + delta_translate + '%)'
        });
    });
}


$.PrivacyExclusiveSelect = function () {
    $('#privacy').on('click', function () {
        $('#no-privacy').attr('checked', false);
    });
    $('#no-privacy').on('click', function () {
        $('#privacy').attr('checked', false);
    });
}