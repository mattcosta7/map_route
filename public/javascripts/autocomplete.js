var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  geocoder = new google.maps.Geocoder();
  var acInputs = document.getElementsByClassName("autocomplete");

    for (var i = 0; i < acInputs.length; i++) {

        var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);
        autocomplete.inputId = acInputs[i].id;

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var inputField = document.getElementById(this.inputId);
          var place = inputField.value;
          geocoder.geocode({"address": place}, function(results, status){
            if (status == google.maps.GeocoderStatus.OK){
              console.log(results[0].geometry.location);
              inputField.nextElementSibling.value = results[0].geometry.location.lat();
              inputField.nextElementSibling.nextElementSibling.value = results[0].geometry.location.lng()
            }
          });
          // var place = autocomplete.inputId.getPlace();
          // this.nextElementSibling.value = place.geometry.location.lat();
          // this.nextElementSibling.nextElementSibling.value = place.geometry.location.lng();

        });
    }
}

// function geolocate() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//       var circle = new google.maps.Circle({
//         center: geolocation,
//         radius: position.coords.accuracy
//       });
//       autocomplete.setBounds(circle.getBounds());
//     });
//   }
// }
