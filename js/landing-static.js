'use strict';
$(document).ready(function () {

  $('.popup-youtube').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160
  });

  var sliderStory = $('.story-slider');
  sliderStory.not('.slick-initialized').slick({
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipe: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          infinite: true
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  //discover block
  var discoverProducts = $('.discover-products');
  discoverProducts.on('click', '.discover-item', function (event) {
    var self = $(this);
    if (self.closest('.video-block').hasClass('shrinked') && $(window).width() > 992) {
      return true;
    }
    if ($(event.target).hasClass('btn-plus')) {
      if ($(this).hasClass('active')) {
        $('.discover-item').removeClass('active');
        $('.discover-items').removeClass('opened').addClass('closed');
        setTimeout(function () {
          self.removeClass('animated');
          $('.discover-items').removeClass('animate-all');
          $('.discover-background').removeClass('show');
        }, 800);
      } else {
        $('.discover-items').removeClass('closed');
        $('.discover-item').removeClass('active');
        $(this).addClass('active').closest('.discover-items').addClass('opened');
        setTimeout(function () {
          $('.discover-item').removeClass('animated');
          self.addClass('animated');
          $('.discover-items').addClass('animate-all');
        }, 800);
      }
      return false;
    } else if (!$('.discover-items').hasClass('opened')) {
      $('.discover-items').removeClass('closed');
      $('.discover-item').removeClass('active');
      $(this).addClass('active').closest('.discover-items').addClass('opened');
      setTimeout(function () {
        $('.discover-item').removeClass('animated');
        self.addClass('animated');
        $('.discover-items').addClass('animate-all');
      }, 800);
    } else {
      if (!$(this).hasClass('active') && $('.discover-items').hasClass('opened')) {
        $('.discover-item').removeClass('active');
        $(this).addClass('active').closest('.discover-items').addClass('opened');
        setTimeout(function () {
          $('.discover-item').removeClass('animated');
          self.addClass('animated');
          $('.discover-items').addClass('animate-all');
        }, 800);
      }
    }
  });

});
