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
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('search_address_1'),
      {types: ['geocode']}
    );
  autocomplete2 = new google.maps.places.Autocomplete(
    document.getElementById('search_address_2'),
      {types: ['geocode']}
    );
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace(); 
      document.getElementById('search_lat1').value = place.geometry.location.lat();
      document.getElementById('search_lng1').value = place.geometry.location.lng();
  });
  google.maps.event.addListener(autocomplete2, 'place_changed', function () {
      var place = autocomplete2.getPlace(); 
      document.getElementById('search_lat2').value = place.geometry.location.lat();
      document.getElementById('search_lng2').value = place.geometry.location.lng();

  });
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

