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

  $carousel.on('staticClick.flickity', function( event, pointer, cellElement, cellIndex ) {
    $carousel.flickity('select', cellIndex);
  });

  var cellRatio = 0.3333333, // outerWidth of cell / width of carousel
        bgRatio = 0.15, // width of background layer / width of carousel
        fgRatio = 1.25, // width of foreground layer / width of carousel
        count = $('.member').length;

  function moveParallaxLayer( $layer, layerRatio, progress ) {
    var ratio = cellRatio * layerRatio;
    $layer.css({
      left: ( 50% - 0.5 - ( 0.5 + progress * count ) * ratio ) * 100 + '%'
    });
  }

  $carousel.on('scroll.flickity', function (event, progress) {
    moveParallaxLayer($('.background1'), bgRatio, progress);
  });
});
