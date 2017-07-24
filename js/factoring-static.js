'use strict';
$(document).ready(function () {

  var ua = navigator.userAgent;
  var isiOS = /iPhone/i.test(ua) || /iPod/i.test(ua) || /iPad/i.test(ua);
  // form validation
  var factoringForm = $('#factoring-form'),
    formSubmit = factoringForm.find('input[type="submit"]');
  factoringForm.validate({ errorPlacement: function (error, element) { } });

  // switching between steps
  var factoringStepOne = $('.factoring-step-1'),
    factoringStepTwo = $('.factoring-step-2'),
    factoringStepThree = $('.factoring-step-3'),
    factoringStepFour = $('.factoring-step-4'),
    factoringStepFive = $('.factoring-step-5'),
    factoringStepSix = $('.factoring-step-6'),
    toStepOne = $('.to-step-1'),
    toStepThree = $('.to-step-3'),
    btnStepTwo = $('.btn-step-2'),
    btnStepThree = $('.btn-step-3'),
    btnStepFour = $('.btn-step-4'),
    btnStepSix = $('.btn-step-6');
  if (!isiOS) {
    jcf.replaceAll();
  } else {
    $('body').addClass('ios');
    if (typeof customScroll !== 'undefined') {
      customScroll.removeClass('jcf-scrollable');
    }
    jcf.replaceAll();
  }


  $('.custom-number').number(true, 0, ',', '.');
  function enableNextStepButton() {
    var inputs_filled = [];
    var can_proceed = [];
    $('.factoring-step').each(function (i) {
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
  enableNextStepButton();


  function scrollToForm() {
    $('html, body').animate({
      scrollTop: factoringForm.offset().top - $('#header').outerHeight(true)
    }, 750);
  }
  function nextStep(stepCurrent, stepNext) {
    stepCurrent.hide();
    stepNext.fadeIn().find('.factoring-title').addClass('ready-for-typing animation-on-scroll').removeClass('factoring-title');
    $.ScrollAnimation();
    scrollToForm();
  }
  function prevStep(stepCurrent, stepPrev) {
    stepCurrent.hide();
    stepPrev.fadeIn();
    scrollToForm();
  }
  $('.factoring-step-1 #country-select').change(function () {
    $('#selected-country').text($(this).val());
    nextStep(factoringStepOne, factoringStepTwo);
  });

  btnStepTwo.on('click', function () {
    nextStep(factoringStepOne, factoringStepTwo);
    return false;
  });
  btnStepThree.on('click', function () {
    nextStep(factoringStepTwo, factoringStepThree);
    return false;
  });
  btnStepFour.on('click', function () {
    nextStep(factoringStepThree, factoringStepFour);
    return false;
  });
  btnStepSix.on('click', function () {
    nextStep(factoringStepThree, factoringStepSix);
    return false;
  });
  factoringStepThree.on('click', toStepOne, function () {
    prevStep(factoringStepThree, factoringStepOne);
    return false;
  });
  factoringStepTwo.on('click', toStepOne, function (event) {
    if ($(event.target).hasClass('step-back') || $(event.target).hasClass('fa-long-arrow-left')) {
      prevStep(factoringStepTwo, factoringStepOne);
      return false;
    }
  });
  factoringStepFour.on('click', function (event) {
    if ($(event.target).hasClass('step-back') || $(event.target).hasClass('fa-long-arrow-left')) {
      prevStep(factoringStepFour, factoringStepThree);
      return false;
    }
  });
  factoringStepSix.on('click', function (event) {
    if ($(event.target).hasClass('step-back') || $(event.target).hasClass('fa-long-arrow-left')) {
      prevStep(factoringStepSix, factoringStepThree);
      return false;
    }
  });

  formSubmit.on('click', function () {
    if (factoringForm.valid()) {
      setTimeout(function () {
        nextStep(factoringStepFour, factoringStepFive);
      }, 200);
      return false;
    }
  });

});
