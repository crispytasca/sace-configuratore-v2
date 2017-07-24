'use strict';
$(document).ready(function () {

  // detect iOS devices
  var ua = navigator.userAgent;
  var isiOS = /iPhone/i.test(ua) || /iPod/i.test(ua) || /iPad/i.test(ua);

  // custom scrollbar
  var customScroll = $('.custom-scroll'),
    fieldTitle = $('.field-title'),
    configuratorFormWrapper = $('.configurator-form-wrapper'),
    header = $('#header'),
    configuratorForm = $('#configurator-form'),
    formSubmit = configuratorForm.find('input[type="submit"]');
  configuratorForm.validate({ errorPlacement: function (error, element) { } });
  if (!isiOS) {
    jcf.replaceAll();
  } else {
    $('body').addClass('ios');
    customScroll.removeClass('jcf-scrollable');
    jcf.replaceAll();
  }

  //initialize number input
  $('.custom-number').number(true, 0, ',', '.');

  //initialize range slider
  // $('.rangeslider').ionRangeSlider({
  //   min: 0,
  //   max: 60,
  //   from: 0,
  //   step: 6,
  //   grid: true,
  //   hide_min_max: true,
  //   grid_num: 10,
  //   onChange: function(data) {
  //     console.log(data);
  //   }
  // });

  if (customScroll.length) {
    customScroll.on('scroll', function () {
      if (customScroll.scrollTop() == 0) {
        fieldTitle.not(':first').removeClass('absolute');
      }
      fieldTitle.each(function (i, e) {
        if ($(e).next('.field-body').position().top < 0 && i == 0) {
          $(e).addClass('absolute');
        } else if ($(e).position().top < 0 && i > 0) {
          $(e).addClass('absolute');
        } else if ($(e).next('.field-body').position().top > 0 && i == 0) {
          $(e).removeClass('absolute');
        } else if ($(e).next('.field-body').position().top - $(e).outerHeight() >= 0 && i > 0) {
          $(e).removeClass('absolute');
        }
      });
    });
  }

  fieldTitle.on('click', 'a', function () {
    var self = $(this);
    setTimeout(function () {
      if (customScroll.scrollTop() == 0) {
        fieldTitle.removeClass('absolute');
      }
      jcf.refreshAll();
    }, 400);
  });

  //check for the first form step
  var firstStepElements = $('.configurator-step-1 .controlled'),
    configuratorHint = $('.configurator-hint'),
    configurator = $('.configurator'),
    configuratorMenu = $('.configurator-menu'),
    configuratorStepOne = $('.configurator-step-1'),
    configuratorStepTwo = $('.configurator-step-2'),
    configuratorStepThree = $('.configurator-step-3'),
    configuratorStepFour = $('.configurator-step-4'),
    configuratorStepFive = $('.configurator-step-5');
  firstStepElements.change(function () {
    var quantity = 0;
    firstStepElements.each(function (i, e) {
      if ($(this).val()) {
        quantity++;
      }
    });
    if (quantity == firstStepElements.length) {
      configuratorHint.addClass('to-next-step');
    } else {
      configuratorHint.removeClass('to-next-step');
    }
  });
  configuratorHint.on('click', '.btn-step', function () {
    if ($(this).closest('.configurator').hasClass('zero-step')) {
      stepActivate($('.menu-step-1'));
    } else if ($(this).closest('.configurator').hasClass('first-step')) {
      stepActivate($('.menu-step-2'));
    } else if ($(this).closest('.configurator').hasClass('second-step')) {
      stepActivate($('.menu-step-3'));
    } else if ($(this).closest('.configurator').hasClass('third-step')) {
      stepActivate($('.menu-step-4'));
    } else if ($(this).closest('.configurator').hasClass('fourth-step')) {
      stepActivate($('.menu-step-5'));
    }
    configuratorHint.find('div:nth-child(2)').fadeIn(function () {
      var self = $(this);
      setTimeout(function () {
        self.addClass('current-hint');
      }, 100)
    });
    configuratorHint.find('div:nth-child(2)')
    configuratorHint.find('div').removeClass('current-hint');
    return false;
  });

  configuratorMenu.on('click', 'li', function () {
    stepActivate($(this));
    return false;
  });
  function stepActivate(newStep) {
    if (newStep.hasClass('menu-step-1')) {
      configurator.removeClass('zero-step first-step second-step third-step fourth-step fifth-step').addClass('first-step');
      $(configuratorStepTwo, configuratorStepThree, configuratorStepFour, configuratorStepFive).hide();
      configuratorStepOne.show();
      jcf.destroy($('.jcf-scrollable'));
      setTimeout(function () {
        jcf.replaceAll();
      }, 100);
    }
    if (newStep.hasClass('menu-step-2')) {
      configurator.removeClass('zero-step first-step second-step third-step fourth-step fifth-step').addClass('second-step');
      $(configuratorStepOne, configuratorStepThree, configuratorStepFour, configuratorStepFive).hide();
      configuratorStepTwo.show();
      jcf.destroy($('.jcf-scrollable'));
      setTimeout(function () {
        jcf.replaceAll();
      }, 100);
    }
    if (newStep.hasClass('menu-step-3')) {
      configurator.removeClass('zero-step first-step second-step third-step fourth-step fifth-step').addClass('third-step');
      $(configuratorStepOne, configuratorStepTwo, configuratorStepFour, configuratorStepFive).hide();
      configuratorStepThree.show();
      jcf.destroy($('.jcf-scrollable'));
      setTimeout(function () {
        jcf.replaceAll();
      }, 100);
    }
    if (newStep.hasClass('menu-step-4')) {
      configurator.removeClass('zero-step first-step second-step third-step fourth-step fifth-step').addClass('fourth-step');
      $(configuratorStepOne, configuratorStepTwo, configuratorStepThree, configuratorStepFive).hide();
      configuratorStepFour.show();
      jcf.destroy($('.jcf-scrollable'));
      setTimeout(function () {
        jcf.replaceAll();
      }, 100);
    }
    if (newStep.hasClass('menu-step-5')) {
      configurator.removeClass('zero-step first-step second-step third-step fourth-step fifth-step').addClass('fifth-step');
      $(configuratorStepOne, configuratorStepTwo, configuratorStepThree, configuratorStepFour).hide();
      configuratorStepFive.show();
      jcf.destroy($('.jcf-scrollable'));
      setTimeout(function () {
        jcf.replaceAll();
      }, 100);
    }
    configuratorHint.find('div').removeClass('current-hint').hide();
    configuratorHint.find('div:nth-child(2)').fadeIn(function () {
      var self = $(this);
      setTimeout(function () {
        self.addClass('current-hint');
      }, 100)
    });
    configuratorMenu.find('li').removeClass('active');
    newStep.addClass('active');
    jcf.refreshAll();
    if ($(window).width() < 768) {
      var headerAndMenuHeight = configuratorMenu.outerHeight() + header.outerHeight();
      $('html, body').animate({
        scrollTop: configuratorFormWrapper.offset().top - headerAndMenuHeight
      }, 750);
    }
  }

  //check email validation
  var emailField = $('#configurator-email');
  emailField.change(function () {
    $('#configurator-email').valid();
  });

  //show thanks message
  /* $('.configurator-step-5 input[type="submit"]').on('click', function(){
     $('.email-step').hide();
     $('.thanks-message').fadeIn();
     return false;
   });*/

  //mobile configuration behavior on scroll
  function mobileConfigurator() {
    var headerAndMenuHeight = configuratorMenu.outerHeight() + header.outerHeight();
    configuratorMenu.height(configuratorMenu.outerHeight());
    if ($(window).scrollTop() > configuratorMenu.offset().top - header.outerHeight()) {
      configuratorMenu.find('ul').addClass('fixed').css('top', header.outerHeight());
    } else {
      configuratorMenu.find('ul').removeClass('fixed').removeAttr('style');
    }
    if ($(window).scrollTop() < configuratorFormWrapper.offset().top - headerAndMenuHeight) {
      fieldTitle.not(':first').removeClass('fixed');
    }
    fieldTitle.each(function (i, e) {
      if ($(e).next('.field-body').offset().top - headerAndMenuHeight < $(window).scrollTop() && i == 0) {
        $(e).addClass('fixed').css('top', headerAndMenuHeight);
      } else if ($(e).offset().top - headerAndMenuHeight < $(window).scrollTop() && i > 0) {
        $(e).addClass('fixed').css('top', headerAndMenuHeight);
      } else if ($(e).next('.field-body').offset().top - headerAndMenuHeight > $(window).scrollTop() && i == 0) {
        $(e).removeClass('fixed').removeAttr('style');
      } else if ($(e).next('.field-body').offset().top - $(e).outerHeight() - headerAndMenuHeight >= $(window).scrollTop() && i > 0) {
        $(e).removeClass('fixed').removeAttr('style');
      }
    });
  }

  fieldTitle.on('click', function () {
    $(this).toggleClass('closed');
  });

  // show correct hint
  $('.hint-field').on('focus click', function () {
    showHintBlock($(this));
  });
  $('.rangeslider').on('input change', function () {
    showHintBlock($(this));
  });
  function showHintBlock(element) {
    var hint = $('.hint-block[data-hint=' + element.data("hint") + ']');
    if (!hint.hasClass('current-hint')) {
      $('.hint-block').hide().removeClass('current-hint');
    }
    hint.fadeIn().addClass('current-hint');
  }

  formSubmit.on('click', function () {
    if ($('#configurator-form').valid()) {
      setTimeout(function () {
        $('.email-step, .fields-report').hide();
        $('.thanks-message').fadeIn();
      }, 200);
      return false;
    }
  });

  $(window).on('scroll', function () {
    if ($(window).width() < 768) {
      mobileConfigurator();
    }
  });

});
