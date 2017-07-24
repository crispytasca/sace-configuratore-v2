$(window).load(function () {
    $.SlideUpDown();
    $.RoadMap();
    $.FormFields();
    $('#insurance-form').validate({ errorPlacement: function (error, element) { console.log(error, " ", element); } });
    var auto_scroll_timeout = 0;
    auto_scroll_timeout = setTimeout(function () {
        $.scrollify.move(2);
    }, 7500);
    $(window).scroll(function () {
        if (window.pageYOffset > $(window).height() * 2) {
            clearTimeout(auto_scroll_timeout);
        }
    });
});

$.SlideUpDown = function () {
    var $btn_prev = $('.configurator-container i.btn-prev');
    $(window).scroll(function () {
        var current_slide = $.scrollify.current();
        if (typeof current_slide !== 'undefined' && current_slide.length) {
            if (current_slide.hasClass('navigable-1') || current_slide.hasClass('navigable-0')) {
                $btn_prev.removeClass('visible');
            } else {
                $btn_prev.addClass('visible');
            }
        }
    });
    $btn_prev.click(function () {
        $.scrollify.previous();
    });
    var $btn_next = $('.next-slide');
    $btn_next.each(function () {
        $(this).click(function () {
            $.scrollify.next();
        });
    })
}


$.RoadMap = function () {
    // BUILD ROADMAP
    var $road_map = $('.road-map');
    var $overall = $('.road-map').find('.line-overall');
    var $completed = $('.line-completed');
    var $btn_prev = $('.configurator-container i.btn-prev');
    var total_steps = 0;
    var current_step = 0;
    var $infos = $('.infos');
    $('.form-step').not('.no-road-map').each(function (i) {
        var $form_step = $(this);
        var $road_map_title = $form_step.find('.road-map-title');
        if ($road_map_title.length) {
            $form_step.addClass('step-' + (i));
            $form_step.data('step', i);
            $('.road-map .steps-container').append('<div class="step"><span class="goto" data-goto=".step-' + (i) + '" data-step="' + i + '">' + $road_map_title.html() + '</span></div>');
            total_steps++;
        }
    });
    if ($(window).width() > 992) {
        // ROADMAP TEXT COLORS
        $('span.goto').each(function () {
            var $btn = $(this);
            var $goto = $($btn.data('goto'));
            $btn.click(function () {
                var current_slide = $.scrollify.current();
                var current_step = parseInt(current_slide.data('step'));
                if ($btn.data('step') + 1 <= current_step) {
                    $.scrollify.move($btn.data('step') + 2);
                }
            });
        });
        $overall.css({
            height: $road_map.height() - $('.step').height(),
            top: $('.step').height() / 2 - 5
        });
        // LINE ANIMATION
        var completed_timeout = 0;
        $(window).scroll(function () {
            // $.scrollify.update();
            var current_slide = $.scrollify.current();
            if (typeof current_slide !== 'undefined' && current_slide.length) {
                if (current_slide.hasClass('no-road-map')) {
                    $road_map.removeClass('visible');
                    $infos.removeClass('visible');
                } else {
                    $road_map.addClass('visible');
                }
            }

            if (!completed_timeout && typeof current_slide !== 'undefined') {
                completed_timeout = setTimeout(function () {
                    var tot_height = $overall.height();
                    var current_step = parseInt(current_slide.data('step'));
                    var tot_steps = $('.step').length - 1;
                    var partial_height = tot_height / tot_steps * current_step;
                    partial_height = typeof partial_height === 'undefined' || partial_height === NaN || !partial_height ? 0 : partial_height;
                    if (!$completed.hasClass('animating')) {
                        $completed.addClass('animating');
                        $completed.stop().animate({
                            height: partial_height
                        }, 500, function () {
                            setTimeout(function () {
                                $completed.removeClass('animating');
                            }, 1000);
                        });
                    }
                    $('.goto').each(function (i) {
                        if (isNaN(current_step)) {
                            if (i !== 0) {
                                $(this).attr('class', 'goto');
                            } else {
                                $(this).attr('class', 'goto current');
                            }
                            $('.infos').removeClass('visible');
                        } else if (i < current_step) {
                            $(this).attr('class', 'goto passed');
                        } else if (i > current_step) {
                            $(this).attr('class', 'goto');
                        } else {
                            if (!$('.infos').hasClass('animating')) {
                                $('.infos').addClass('animating');
                                $(this).attr('class', 'goto current');
                                var $info_title = $('.step-' + i).find('.info-title');
                                var $info_description = $('.step-' + i).find('.info-description');
                                $('.infos').removeClass('visible');
                                if ($info_title.html() !== '' || $info_description.html() !== '') {
                                    setTimeout(function () {
                                        $('.infos .info-title').empty();
                                        $('.infos .info-description').empty();
                                        if ($info_title.hasClass('just-on-select')) {
                                            var $select = $info_title.closest('.form-step').find('select');
                                            $select.on('change select', function () {
                                                $('.infos .info-title').html($info_title.html());
                                                $infos.addClass('visible');
                                                $info_title.removeClass('just-on-select');
                                            });
                                        } else {
                                            $('.infos .info-title').html($info_title.html());
                                            $infos.addClass('visible');
                                        }
                                        if ($info_description.hasClass('just-on-select')) {
                                            var $select = $info_description.closest('.form-step').find('select');
                                            $select.on('change select', function () {
                                                $('.infos .info-description').html($info_description.html());
                                                $infos.addClass('visible');
                                                $info_description.removeClass('just-on-select');
                                            });
                                        } else {
                                            $('.infos .info-description').html($info_description.html());
                                            $infos.addClass('visible');
                                        }
                                        setTimeout(function () {
                                            $('.infos').removeClass('animating')
                                        }, 2000);
                                    }, 200);
                                } else {
                                }
                            }
                        }
                    });
                    clearTimeout(completed_timeout);
                    completed_timeout = 0;
                }, 333);
            }
        });
    }
    else {
        $road_map = $('.road-map-mobile');
        var $overall = $road_map.find('.line-overall');
        $btn_prev.click(function () {
            if (current_step >= 0) {
                var $prev_slide = $('.step-' + (current_step - 1));
                if ($prev_slide.length) {
                    $(animateHtmlOrBody()).animate({
                        scrollTop: $prev_slide.offset().top
                    }, 750, function () {
                        current_step--;
                    })
                }
            }
        });
        $('.next-slide').each(function () {
            var $btn_next = $(this);
            $btn_next.click(function () {
                if ($btn_next.hasClass('enabled')) {
                    var $next_slide = $btn_next.closest('.form-step').next();
                    if ($next_slide.length) {
                        current_step++;
                        $(animateHtmlOrBody()).animate({
                            scrollTop: $next_slide.offset().top
                        }, 750);
                    }
                }
            });
        });
        $(window).scroll(function () {
            var tot_steps = $('.form-step').length;
            var tot_width = $overall.width();
            if (window.pageYOffset <= $('.form-step.step-0').offset().top) {
                $road_map.removeClass('visible');
                $btn_prev.removeClass('visible');
            } else {
                $btn_prev.addClass('visible');
                $road_map.addClass('visible');
                $('.form-step').each(function (i) {
                    var $form_step = $(this);
                    if (window.pageYOffset + 50 >= $form_step.offset().top && !$form_step.hasClass('hidden')) {
                        var partial_width = tot_width / (tot_steps - 2) * i;
                        $('.line-completed').stop().animate({
                            'width': partial_width
                        })
                    }
                });
            }
        });
    }
}

$.FormFields = function () {
    // CHECK FIELDS
    var inputs_filled = [];
    var can_proceed = [];
    $('.form-part-container').each(function (i) {
        // INPUTS
        var $form_part = $(this);
        inputs_filled[i] = [];
        can_proceed[i] = false;
        $form_part.find('input, select').not(':input[type=submit]').not('.not-required').each(function (j) {
            inputs_filled[i][j] = false;
            $(this).on('change input propertychange paste', function () {
                // CHECK IF ALL FIELDS ARE FILLED
                if ($(this).val()) {
                    inputs_filled[i][j] = true;
                    can_proceed[i] = inputs_filled[i].indexOf(false) < 0;
                }
                else {
                    inputs_filled[i][j] = false;
                    can_proceed[i] = false;
                }
                // CHECK IF CAN PROCEED
                if (can_proceed[i]) {
                    $form_part.closest('.form-step').next().addClass('navigable navigable-not-indexed').removeClass('hidden');
                    $.scrollify.update();
                    $form_part.closest('.form-step').find('.next-slide').addClass('enabled');
                } else {
                    $form_part.closest('.form-step').find('.next-slide').removeClass('enabled');
                }
            });
        });

        // FOR CATs THAT DOES NOT HAVE INPUTS
        if (!$form_part.find('input, select').length) {
            $form_part.closest('.form-step').find('.next-slide').addClass('enabled');
            $form_part.closest('.form-step').find('.next-slide').click(function () {
                $form_part.closest('.form-step').next().addClass('navigable navigable-not-indexed').removeClass('hidden');
                $.scrollify.update();
                $.scrollify.next();
            });
        }
    });
    $('#insurance-form').find('input[type=submit]').click(function (e) {
        e.preventDefault();
        var $insurance_form = $('#insurance-form');
        $insurance_form.validate();
        if ($insurance_form.valid()) {
            // DO SOMETHING
        }
        return false;
    });
    // ION RANGE SLIDER
    $('.rangeslider').ionRangeSlider({
        min: 0,
        max: 60,
        from: 0,
        step: 6,
        grid: true,
        hide_min_max: true,
        grid_num: 10,
        onChange: function (data) {
            if (data.from) {
                $('.rangeslider').closest('.form-step').find('.next-slide').addClass('enabled');
            } else {
                $('.rangeslider').closest('.form-step').find('.next-slide').removeClass('enabled');
            }
        }
    });
}


// LOGIC V2 - Not completed

$.RoadMapV2 = function () {
    var $btn_prev = $('i.btn-prev');
    var $btn_next = $('.next-slide');
    var $infos = $('.infos');
    var total_steps = $.InitRoadMap();
    current_step = 0;
    $btn_prev.click(function () {
        current_step = $.PrevStep(current_step);
        $.UpdateRoadMap(current_step, total_steps);
    });
    $btn_next.click(function () {
        current_step = $.NextStep(current_step);
        $.UpdateRoadMap(current_step, total_steps);
    });
}

$.NextStep = function (current_step) {
    next_step = current_step + 1;
    var $next_step = $('.step-' + next_step);
    if (!$next_step.length) {
        return current_step;
    } else {
        $(animateHtmlOrBody()).animate({
            scrollTop: $next_step.offset().top
        }, 1500);
        $.scrollify.update();
        return next_step;
    }
}

$.PrevStep = function (current_slide) {
    next_step = current_step - 1;
    var $next_step = $('.step-' + next_step);
    if (!$next_step.length) {
        return current_step;
    } else {
        $(animateHtmlOrBody()).animate({
            scrollTop: $next_step.offset().top
        }, 1500);
        $.scrollify.update();
        return next_step;
    }
}

$.InitRoadMap = function () {
    var $road_map = $('.road-map');
    var $overall = $('.line-overall');
    var total_steps = 0;
    $('.form-step').not('.no-road-map').each(function (i) {
        var $form_step = $(this);
        var $road_map_title = $form_step.find('.road-map-title');
        if ($road_map_title.length) {
            $form_step.addClass('step-' + (i));
            $form_step.data('step', i);
            $('.road-map .steps-container').append('<div class="step"><span class="goto" data-goto=".step-' + (i) + '" data-step="' + i + '">' + $road_map_title.html() + '</span></div>');
            total_steps++;
        }
    });
    $('span.goto').each(function () {
        var $btn = $(this);
        var $goto = $($btn.data('goto'));
        $btn.click(function () {
            var current_slide = $.scrollify.current();
            var current_step = parseInt(current_slide.data('step'));
            if ($btn.data('step') + 1 <= current_step) {
                $.scrollify.move($btn.data('step') + 1);
            }
        });
    });

    $overall.css({
        height: $road_map.height() - $('.step').height(),
        top: $('.step').height() / 2 - 5
    });
    return total_steps;
}

$.UpdateRoadMap = function (current_step) {
    var $road_map = $('.road-map');
    var $overall = $('.line-overall');
    var $completed = $('.line-completed');
    var $form_step = $(this);

}

$.EnableButtons = function () {

}