'use strict';
$(document).ready(function () {

  /* function for sticking header on scroll */
  function headerSticking() {
    var header = $('#header'),
      topBlock = $('.top-block');
    if (header.length) {
      if ($(window).scrollTop() > topBlock.height() + header.height()) {
        // header.addClass('fixed').removeClass('animation-on-load animation-start');
      } else {
        // header.removeClass('fixed');
      }
    }
  }

  /* go to bottom block on click */
  var arrowDown = $('.arrow-down');
  arrowDown.on('click', 'a', function () {
    $('html, body').animate({
      scrollTop: $('.anchor-down').offset().top + $('#header').outerHeight(true) / 2
    }, 750);
    return false;
  });

  // go to page top button
  // show got top button on scroll

  var goTopButton = $('.go-top');
  goTopButton.on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 750);
    return false;
  });

  /* typewriter effect */
  $.setupTypewriter = function setupTypewriter(t) {

    var elementHeight = t.offsetHeight;
    t.style.height = elementHeight + "px";

    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
      tag = "",
      writingTag = false,
      tagOpen = false,
      typeSpeed = 0.1,
      tempTypeSpeed = 0;

    var type = function () {

      if (writingTag === true) {
        tag += HTML[cursorPosition];
      }

      if (HTML[cursorPosition] === "<") {
        tempTypeSpeed = 0;
        if (tagOpen) {
          tagOpen = false;
          writingTag = true;
        } else {
          tag = "";
          tagOpen = true;
          writingTag = true;
          tag += HTML[cursorPosition];
        }
      }
      if (!writingTag && tagOpen) {
        tag.innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
        if (HTML[cursorPosition] === " ") {
          tempTypeSpeed = 0;
        }
        else {
          tempTypeSpeed = (Math.random() * typeSpeed) + 50;
        }
        t.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === ">") {
        tempTypeSpeed = (Math.random() * typeSpeed) + 50;
        writingTag = false;
        if (tagOpen) {
          var newSpan = document.createElement("span");
          t.appendChild(newSpan);
          newSpan.innerHTML = tag;
          tag = newSpan.firstChild;
        }
      }

      cursorPosition += 1;
      if (cursorPosition < HTML.length - 1) {
        setTimeout(type, tempTypeSpeed);
      }

    };

    return {
      type: type
    };
  }

  // scroll animations
  var isTouchDevice = 'ontouchstart' in document.documentElement;

  $.ScrollAnimation = function () {
    var k = 0.2,
      k1 = 0.6,
      k2 = 0.8,
      k3 = 1;

    var target = $('.animation-on-scroll');
    var classAnimate = ('animation-start');

    if (isTouchDevice) {
      k = k1 = k2 = k3 = 1.05;
    }

    $(target).each(function (i, e) {
      if ((window.pageYOffset + $(window).height() * k2) > $(e).offset().top) {
        $(e).addClass(classAnimate);
      }
      if ($(e).hasClass('ready-for-typing')) {
        var typewriter = $.setupTypewriter(e);
        typewriter.type();
        $(e).removeClass('ready-for-typing');
      }
    });
    setTimeout(function () {
      $('.animation-start').removeClass('animation-on-load');
    }, 2000)

  }
  // end scroll animations

  //container animation on scroll
  var topBlock = $('.top-block');
  function containerAnimate() {
    if ($(window).scrollTop() > topBlock.offset().top) {
      topBlock.addClass('animated');
    } else {
      topBlock.removeClass('animated');
    }
  }

  $(window).on('scroll', function () {
    if ($(window).width() < 768) {
      headerSticking();
    }
    $.ScrollAnimation();
    if ($(window).scrollTop() > 0) {
      goTopButton.addClass('displayed');
      arrowDown.fadeOut();
    } else {
      goTopButton.removeClass('displayed');
      arrowDown.fadeIn();
    }
    containerAnimate();
  });


  $(window).on('load', function () {
    $('.animation-on-load').addClass('animation-start');
    $.ScrollAnimation();
  });

});