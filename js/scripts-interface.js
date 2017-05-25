var apiKey = require('./../.env').apiKey;
var mapsApi = require('google-maps-api')( apiKey );

function mapsGeo(myAddress, userTheme) {
  require('google-maps-api/geocode')( {address: myAddress} ).then( function( result ) {
    mylatlng = new google.maps.LatLng(result[0].geometry.location.lat(),result[0].geometry.location.lng());
    map.panTo(mylatlng);
  });
}

function myInitMap(selectedTheme, selectedCoords) {
  mapsApi().then( function( maps ) {
    var lat = selectedCoords[0];
    var lng = selectedCoords[1];
    var mapCoords = new google.maps.LatLng(lat,lng);

    map = new google.maps.Map($('#map')[0], {
      center: mapCoords,
      zoom: 8,
      styles: selectedTheme
    });

    google.maps.event.addListener(map, 'click', function(e) {
      var myLat = e.latLng.lat();
      var myLng = e.latLng.lng();
      var infowindow = new google.maps.InfoWindow({
        position: e.latLng,
        content: "<h4>Lattitude: " + myLat + "</h4>" +
            "<h4>Longitude: " + myLng  + "</h4>"
      });
      infowindow.open(map);
    });
  });
}

$(document).ready(function(){

  var userTheme = themeHash['google_styles_Vintage'];

  // on first page load, center on Portland
  myInitMap(userTheme, [45.5231, -122.6765]);

  $('.search_city').click(function(){
    var city = $('input[name="search_city"]').val();
    mapsGeo(city, userTheme);
  });

  $('.theme').change(function() {
    var theme = $('.theme :selected').val();
    map.setOptions({styles: themeHash[theme]});
  });

});


// var infowindow = new google.maps.InfoWindow({
//   content: ""
// });

// marker.addListener('click', function() {
//   infowindow.open(map, marker);
// });
