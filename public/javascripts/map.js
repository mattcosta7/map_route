function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {});

  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').innerHTML,
    destination: document.getElementById('end').innerHTML,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    data = response;
    if (status === google.maps.DirectionsStatus.OK) {
      var distance = parseFloat(document.getElementById('distance').innerHTML);
      
      var polylineToPoint = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeWeight: 3
      });
      var polylineFromPoint = new google.maps.Polyline({
        path: [],
        strokeColor: '#00FF00',
        strokeWeight: 3
      });

      var bounds = new google.maps.LatLngBounds();
      var distanceCovered = 0
      var legs = response.routes[0].legs;
      for (i=0;i<legs.length;i++) {
        var steps = legs[i].steps;
        for (j=0;j<steps.length;j++) {
          var nextSegment = steps[j].path;
          distanceCovered += steps[j].distance.value;
          for (k=0;k<nextSegment.length;k++) {
            if(distanceCovered <= distance){
              polylineToPoint.getPath().push(nextSegment[k]);
              bounds.extend(nextSegment[k]);
            }
            else{
              polylineFromPoint.getPath().push(nextSegment[k]);
              bounds.extend(nextSegment[k]);
            }
          }
        }
      }

      polylineToPoint.setMap(map);
      polylineFromPoint.setMap(map);
      map.fitBounds(bounds);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
