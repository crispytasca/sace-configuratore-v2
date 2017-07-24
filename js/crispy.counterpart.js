
$(window).on('load resize', function () {
    $.EnableNextStepButton();
    $.Expandible();

});


$.EnableNextStepButton = function () {
    var inputs_filled = [];
    var can_proceed = [];
    $('.counterpart-step').each(function (i) {
        var $factoring_step = $(this);
        var $btn_next = $(this).find('.btn-next');
        if ($btn_next.length) {
            inputs_filled[i] = [];
            can_proceed[i] = false;
            $factoring_step.find('input, select').not(':input[type=submit]').each(function (j) {
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
                        $btn_next.addClass('enabled');
                    } else {
                        $btn_next.removeClass('enabled');
                    }
                });
            });
        }
    });
}

$.Expandible = function () {
    $('.expand-expandible').click(function (e) {
        e.preventDefault();
        $('#counterpart-table').find('.collapse').each(function (i) {
            var $expandible = $(this);
            setTimeout(function () {
                $expandible.removeClass('collapse');
            }, i * 0);
        })
    });
}