var apiKey = require('./../.env').apiKey;
var mapsapi = require('google-maps-api')( apiKey );

$(document).ready(function(){

  mapsapi().then( function( maps ) {
    map = new google.maps.Map($('#map')[0], {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 8,
      styles: google_styles1
    });
    google.maps.event.addListener(map, 'click', function(e) {
      // placeMarker(e.latLng, map);
      var myLat = e.latLng.lat();
      var myLng = e.latLng.lng();
      var infowindow = new google.maps.InfoWindow({
        position: e.latLng,
        content: "<p>Lattitude: " + myLat + "</p>" +
            "<p>Longitude: " + myLng + "</p>"
      });
      infowindow.open(map);
    });
  });
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
