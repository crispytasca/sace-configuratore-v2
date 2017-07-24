'use strict';
var auto_animation = 0;
$(document).ready(function () {
});

$(window).on('load resize', function () {
    $(animateHtmlOrBody()).stop().animate({
        scrollTop: 0
    }, 0);
    auto_animation = setTimeout(function () {
        $(animateHtmlOrBody()).stop().animate({
            scrollTop: $('.video-block').offset().top
        }, 1500);
        console.log('animation done');
    }, 7500);
    if ($(window).width() > 992) {
        $.MakeFullPage();
        $.AppearAnimation();
        $.HorizontalAccordion();
    } else {
        $.VerticalAccordion();
    }
    $.ResizeVideo();

});

var t_out = 0;
$(window).on('resize scroll', function () {
    clearTimeout(t_out);
    t_out = setTimeout(function () {
        $.scrollify.update();
        $.ResizeVideo();
    }, 30);
});


$.ResizeVideo = function () {
    var $video = $('#video');
    if ($(window).width() / $(window).height() <= 1440 / 600) {
        $video.css({
            height: $(window).height(),
            width: 'auto'
        });
    } else {
        $video.css({
            height: 'auto',
            width: $(window).width()
        });
    }
}

// appear animation
$.AppearAnimation = function () {
    $('.appear').each(function () {
        var $appear_element = $(this);
        if ((window.pageYOffset + $(window).height()) > $appear_element.offset().top) {
            setTimeout(function () {
                $appear_element.addClass('appear-done');
            }, 1500);
        }
    });
}

$.MakeFullPage = function () {
    var original_heights = [];
    var $elem = $('.make-full-page');
    $elem.each(function (i) {
        original_heights[i] = $(this).height();
    });
    $(window).scroll(function () {
        $elem.each(function (i) {
            if (window.pageYOffset + $(window).height() >= $elem.offset().top + $elem.height() && $(window).scrollTop() > 1) {
                var new_height = window.pageYOffset + $(window).height() - $elem.offset().top;
                new_height = Math.max(new_height, original_heights[i]);
                new_height = Math.min(new_height, $(window).height());
                $(this).height(new_height);
                $(this).addClass('max-height-reached');
                $(this).removeClass('shrinked');
            } else {
                var new_height = window.pageYOffset + $(window).height() - $elem.offset().top;
                new_height = Math.max(new_height, original_heights[i]);
                new_height = Math.min(new_height, $(window).height());
                $(this).height(new_height);
                $(this).removeClass('max-height-reached');
                $(this).addClass('shrinked');
            }
        });
    });
}


$.HorizontalAccordion = function () {
    $('.video-container').click(function () {
        var $current_slide = $.scrollify.current();
        if ($current_slide.hasClass('navigable-0')) {
            $(animateHtmlOrBody()).stop().animate({
                scrollTop: $('.video-container').offset().top
            });
        }
    });
    $(window).scroll(function () {
        if ($('.max-height-reached').length && $('.appear-done').length) {
            $('.discover-item').removeClass('fade-out');
            $('.discover-item').each(function (i) {
                var $discover_item = $(this);
                setTimeout(function () {
                    $discover_item.addClass('show');
                }, (i + 1) * 500);
            });
        } else {
            $('.discover-item').addClass('fade-out');
            setTimeout(function() {
                $('.discover-item').removeClass('show');
            }, 500);
            setTimeout(function () {
                $('.discover-item').removeClass('active');
                $('.discover-item').removeClass('animated');
                $('.discover-items').removeClass('opened');
                $('.discover-items').removeClass('animate-all');
                $('.discover-background').removeClass('show');
            }, 1);
        }
    });
    $('.discover-info').each(function () {
        var $discover_info = $(this);
        var $discover_info_inner = $discover_info.find('.discover-info-inner');
        var original_margin = $discover_info_inner.css('margin');
        $discover_info.hover(function () {
            if (!$discover_info.closest('.discover-item').hasClass('active')) {
                $discover_info_inner.animate({
                    'margin-bottom': 80
                });
            }
        }, function () {
            $discover_info_inner.animate({
                'margin': original_margin
            });
        });

        $discover_info.click(function (e) {
            if ($discover_info.closest('.video-block').hasClass('shrinked')) {
                return true;
            }
            var background_id = $discover_info.data('show-background');
            $('.discover-info-inner').animate({
                'margin': original_margin
            });
            $('.discover-background').each(function () {
                if (background_id.indexOf($(this).attr('id')) < 0) {
                    $(this).removeClass('show');
                }
            });
            if ($(background_id).hasClass('show-next-time')) {
                $('.discover-background').removeClass('show-next-time');
            } else {
                $(background_id).addClass('show');
            }
        });
        $discover_info.find('.btn-plus').click(function (e) {
            $('.discover-background').removeClass('show');
            $('.discover-background').addClass('show-next-time');
        });
    });
}

$.VerticalAccordion = function () {
    // OPEN
    $('.discover-item').each(function () {
        var $discover_info = $(this).find('.discover-info');
        var $discover_info_inner = $discover_info.find('.discover-info-inner');


        $discover_info.click(function (e) {
            var background_id = $discover_info.data('show-background');
            if ($(background_id).hasClass('show-next-time')) {
                $('.discover-background').removeClass('show-next-time');
            } else {
                $(background_id).addClass('show');
            }
            $('.discover-background').each(function () {
                if (background_id.indexOf($(this).attr('id')) < 0) {
                    $(this).removeClass('show');
                } else {
                    $(background_id).hasClass('show-next-time');
                }
            });
        });
        // $discover_info.find('.btn-plus').click(function (e) {
        //     $('.discover-background').removeClass('show');
        //     $('.discover-background').addClass('show-next-time');
        // });
    });
}