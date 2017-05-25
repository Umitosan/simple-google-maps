
var Controler = require('./../js/scripts.js').controlerModule;

$(document).ready(function(){

  var newControler = new Controler();
  var userTheme = themeHash.google_styles_Vintage;

  // on first page load, center on Portland
  newControler.myInitMap(userTheme, [45.5231, -122.6765]);

  $('.search_city').click(function(){
    var city = $('input[name="search_city"]').val();
    newControler.mapsGeo(city, userTheme);
  });

  $('.theme').change(function() {
    var theme = $('.theme :selected').val();
    newControler.mapSetOptions(theme);
  });

});


// var infowindow = new google.maps.InfoWindow({
//   content: ""
// });

// marker.addListener('click', function() {
//   infowindow.open(map, marker);
// });
