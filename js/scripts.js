$(document).ready(function () {
  // initialize carousel
  var $carousel = $('.carousel').flickity({
    cellAlign: 'center',
    contain: false,
    cellSelector: '.slide',
    percentPosition: true,
    prevNextButtons: false,
    pageDots: false,
    selectedAttraction: 0.01,
    friction: 0.15
  });

  // force carousel focus on page load
  $carousel.focus();

  // click handler for each slide
  $carousel.on('staticClick.flickity', function( event, pointer, cellElement, cellIndex ) {
    $carousel.flickity('select', cellIndex);
  });

  // define parallax variables
  var cellRatio = 0.3333333, // outerWidth of cell / width of carousel
        bgRatio = 0.15, // width of background layer / width of carousel
        fgRatio = 1.25, // width of foreground layer / width of carousel
        count = $('.slide').length;

  // handle parallax animation
  function moveParallaxLayer( $layer, layerRatio, progress ) {
    var ratio = cellRatio * layerRatio;
    $layer.css({
      left: ( 50% - 0.5 - ( 0.5 + progress * count ) * ratio ) * 100 + '%'
    });
  }

  // trigger parallax animation on scroll
  $carousel.on('scroll.flickity', function (event, progress) {
    moveParallaxLayer($('.background1'), bgRatio, progress);
  });

  // add click handler for back to start button
  $('.js-startTrigger').on('click', function () {
    $carousel.flickity('select', 0);
  });

  var nextSlide = debounce(function () { $carousel.flickity('next'); }, 250, true);
  var previousSlide = debounce(function () { $carousel.flickity('previous'); }, 250, true);

  $(window).on('mousewheel', function (event) {
    const xDelta = event.originalEvent.wheelDeltaX;
    const yDelta = event.originalEvent.wheelDeltaY;

    if (xDelta < -30 || yDelta < -30) {
      nextSlide();
    } else if (xDelta > 30 || yDelta > 30) {
      previousSlide();
    }
  })
});

$(window).on('load', function () {
  $('.content').css({ height: window.innerHeight });

  $(window).on('resize', function () {
    $('.content').css({ height: window.innerHeight });
  });
})

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
