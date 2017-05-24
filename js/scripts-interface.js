var apiKey = require('./../.env').apiKey;
var mapsapi = require('google-maps-api')( apiKey );

function myInitMap(selectedTheme) {
  mapsapi().then( function( maps ) {
    map = new google.maps.Map($('#map')[0], {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 8,
      styles: selectedTheme
    });
    google.maps.event.addListener(map, 'click', function(e) {
      // placeMarker(e.latLng, map);
      var myLat = e.latLng.lat();
      var myLng = e.latLng.lng();
      var infowindow = new google.maps.InfoWindow({
        position: e.latLng,
        content: "<h4>Lattitude: " + myLat.toFixed(3) + "</h4>" +
            "<h4>Longitude: " + myLng.toFixed(3)  + "</h4>"
      });
      infowindow.open(map);
    });
  });
}

$(document).ready(function(){

  var userTheme = google_styles_Vintage;

  $('.theme').change(function() {
    var theme = $('.theme :selected').val();
    switch(theme) {
      case "Vintage":
          userTheme = google_styles_Vintage;
          break;
      case "AnnexPOI":
          userTheme = google_styles_AnnexPOI;
          break;
      case "lucernewaterch1":
          userTheme = google_styles_lucernewaterch1;
          break;
      case "Belgium":
          userTheme = google_styles_Belgium;
          break;
      default:
        "nothing"
        break;
    }
    myInitMap(userTheme);
  });

  myInitMap(userTheme);

});


// NOTES
// function placeMarker(position, map) {
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map
//   });
// }

// var infowindow = new google.maps.InfoWindow({
//   content: ""
// });

// marker.addListener('click', function() {
//   infowindow.open(map, marker);
// });
