var apiKey = require('./../.env').apiKey;
var mapsApi = require('google-maps-api')( apiKey );
var themeHash = require('./../js/google-styles-interface.js').themeHash;


function Controler() {
}

Controler.prototype.mapsGeo = function(myAddress, userTheme) {
  require('google-maps-api/geocode')( {address: myAddress} ).then( function( result ) {
    mylatlng = new google.maps.LatLng(result[0].geometry.location.lat(),result[0].geometry.location.lng());
    map.panTo(mylatlng);
  });
};

Controler.prototype.mapSetOptions = function(theme) {
  map.setOptions({styles: themeHash[theme]});
};

Controler.prototype.myInitMap = function(selectedTheme, selectedCoords) {
  mapsApi().then( function( maps ) {
    var lat = selectedCoords[0];
    var lng = selectedCoords[1];
    var mapCoords = new google.maps.LatLng(lat,lng);

    map = new google.maps.Map($('#map')[0], {
      center: mapCoords,
      zoom: 10,
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
};

exports.controlerModule = Controler;
