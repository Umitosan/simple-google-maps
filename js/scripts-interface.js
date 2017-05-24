var apiKey = require('./../.env').apiKey;
var mapsapi = require('google-maps-api')( apiKey );


$(document).ready(function(){

  mapsapi().then( function( maps ) {
    map = new google.maps.Map($('#map')[0], {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    //use the google.maps object as you please
  });

});
