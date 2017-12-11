$(document).ready(function () {
  var $carousel = $('.carousel').flickity({
    cellAlign: 'center',
    contain: false,
    cellSelector: '.member',
    percentPosition: true,
    prevNextButtons: false,
    pageDots: false,
    selectedAttraction: 0.01,
    friction: 0.15
  });

  $('.carousel').on('staticClick.flickity', function( event, pointer, cellElement, cellIndex ) {
    $carousel.flickity('select', cellIndex);
  });
});
