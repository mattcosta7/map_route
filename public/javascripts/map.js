function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {
      lat: parseFloat(document.getElementById('search_lat1').innerHTML),
      lng: parseFloat(document.getElementById('search_lng1').innerHTML)
    }
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function findPointNear(resp,dist){
  distance = dist;
  var count = 0;
  var steps = resp.routes[0].legs[0].steps
  for(var i = 0; i < steps.length; i++){
    if(distance >= count + steps[i].distance.value){
      count += steps[i].distance.value;
    }
    else{
      console.log(steps[i].end_location);
      out = steps[i].end_location;
      var infowindow = new google.maps.InfoWindow({
        content: dist+"meters From Origin"
      });
       var marker = new google.maps.Marker({
        position: steps[i].end_location,
        map: map,
        icon: {
          url: window.location.origin + '/assets/face.jpg',
          size: new google.maps.Size(20, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32)
        },
        title: dist+"meters From Origin"
      });
      marker.addListener('click',function(){
        infowindow.open(map,marker);
      })
      return marker.getPosition();
    }
  }
  
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').innerHTML,
    destination: document.getElementById('end').innerHTML,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    data = response;
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      distance = document.getElementById('distance').innerHTML;
      waypoint = findPointNear(response,parseFloat(distance));
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
