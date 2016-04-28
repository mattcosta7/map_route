var placeSearch, autocomplete;

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
              inputField.nextElementSibling.nextElementSibling.value = results[0].geometry.location.lng();
            }
          });
        });
    }
}
