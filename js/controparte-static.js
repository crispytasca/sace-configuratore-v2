'use strict';
$(document).ready(function(){

  // form validation
  var counterpartForm = $('#counterpart-form'),
      formSubmit = counterpartForm.find('input[type="submit"]');
  counterpartForm.validate({ errorPlacement: function(error, element) {} });

  // switching between steps
  var counterpartStepOne = $('.counterpart-step-1'),
      counterpartStepTwo = $('.counterpart-step-2'),
      counterpartStepThree = $('.counterpart-step-3'),
      counterpartStepFour = $('.counterpart-step-4'),
      counterpartStepFive = $('.counterpart-step-5'),
      toStepOne = $('.to-step-1'),
      toStepTwo = $('.to-step-2'),
      toStepThree = $('.to-step-3'),
      btnStepThree = $('.btn-step-3'),
      btnStepFour = $('.btn-step-4'),
      businessNameInput = $('.business-name');
  function scrollToForm(){
    $('html, body').animate({
      scrollTop: counterpartForm.offset().top - $('#header').outerHeight(true)
    }, 750);
  }
  function nextStep(stepCurrent, stepNext){
    stepCurrent.hide();
    stepNext.fadeIn().find('.counterpart-title').addClass('ready-for-typing animation-on-scroll').removeClass('counterpart-title');
    $.ScrollAnimation();
    scrollToForm();
  }
  function prevStep(stepCurrent, stepPrev){
    stepCurrent.hide();
    stepPrev.fadeIn();
    scrollToForm();
  }
  $('.counterpart-step-1 #country-select').change(function(){
    $('#selected-country').text($(this).val());
    nextStep(counterpartStepOne, counterpartStepTwo);
  });
  btnStepThree.on('click', function(){
    if(!$(this).prev().val() == ''){
      nextStep(counterpartStepTwo, counterpartStepThree);
    }else {
      nextStep(counterpartStepTwo, counterpartStepFour);
    }
    return false;
  });
  btnStepFour.on('click', function(){
    nextStep(counterpartStepThree, counterpartStepFour);
    return false;
  });
  toStepOne.on('click', function(){
    prevStep(counterpartStepTwo, counterpartStepOne);
    return false;
  });
  toStepTwo.on('click', function(){
    prevStep(counterpartStepThree, counterpartStepTwo);
    return false;
  });
  toStepThree.on('click', function(){
    if (businessNameInput.val() == ''){
      prevStep(counterpartStepFour, counterpartStepTwo);
    }else {
      prevStep(counterpartStepFour, counterpartStepThree);
    }
    return false;
  });

  // table with sort
  var counterpartTable = $("#counterpart-table").stupidtable(),
      counterpartTableFirstCol = counterpartTable.find("thead th").eq(1);
  counterpartTableFirstCol.stupidsort();

  counterpartTable.on('click', 'label', function(){
    $('#counterpart-table tr').removeClass('active current');
    $(this).closest('tr').addClass('active current');
    $('.full-list-link').addClass('show-button');
  }).on('click', '.btn-plus', function(){
    $(this).closest('tr').siblings().removeClass('activated');
    $(this).closest('tr').toggleClass('activated');
  }).on('mouseenter', 'label', function(){
    $('#counterpart-table tr').removeClass('active');
    $(this).closest('tr').addClass('active');
  }).on('mouseleave', function(){
    $(this).find('tr').removeClass('active');
  });

  formSubmit.on('click', function(){
    if (counterpartForm.valid()){
      setTimeout(function(){
        nextStep(counterpartStepFour, counterpartStepFive);
      }, 200);
      return false;
    }
  });

  // initialize custom select
  jcf.replaceAll();

});
