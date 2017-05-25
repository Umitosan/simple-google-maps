var apiKey = require('./../.env').apiKey;
var mapsApi = require('google-maps-api')( apiKey );

function mapsGeo(myAddress, userTheme) {
  var myCoord = [];
  require('google-maps-api/geocode')( {address: myAddress} ).then( function( result ) {
    var lat = result[0].geometry.location.lat();
    var lng = result[0].geometry.location.lng();
    var tmpLat = parseFloat(lat);
    var tmpLng = parseFloat(lng);
    var myLat = (Math.round( tmpLat * 1e4 ) / 1e4);
    var myLng = (Math.round( tmpLng * 1e4 ) / 1e4);
    myCoord.push(myLat);
    myCoord.push(myLng);
  }).then(function() {
    myInitMap(userTheme, myCoord);
  });
  // console.log("myCoord: ", myCoord);
  // return myCoord;
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

  var userTheme = google_styles_Vintage;
  var currentCoords = [45.5231, -122.6765];

  // on first page load, center on Portland
  myInitMap(userTheme, [45.5231, -122.6765]);

  $('.search_city').click(function(){
    var city = $('input[name="search_city"]').val();
    mapsGeo(city, userTheme);
    // console.log("coords: ", coords);
  });

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
        console.log('Theme selector error');
        break;
    }
    myInitMap(userTheme, currentCoords);
  });



});


// NOTES
// function pla ceMarker(position, map) {
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
