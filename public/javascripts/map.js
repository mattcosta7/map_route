function initMap() {
  $.ajax({
    url: window.location.pathname,
    method: 'get',
    success:function(response){
      resp = response;

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      map = new google.maps.Map(document.getElementById('map'), {});

      var origin = {lat: resp.lat1, lng: resp.lng1};
      var destination = {lat: resp.lat2, lng: resp.lng2};
      var distanceTraveled = resp.distance_traveled;

      var originMarker = new google.maps.Marker({
          position: origin,
          title:"Hello World!",
          map: map,
          label: "O"
      });
      var destinationMarker = new google.maps.Marker({
          position: destination,
          title:"Hello World!",
          map: map,
          label: "D"
      });

      calculateAndDisplayRoute(origin,destination,distanceTraveled,directionsService, directionsDisplay);
    }

  });
  
}

function calculateAndDisplayRoute(origin, destination,distance_traveled,directionsService, directionsDisplay) {
  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    data = response;
    if (status === google.maps.DirectionsStatus.OK) {
      var distance = distance_traveled;
      
      var polylineToPoint = new google.maps.Polyline({
        path: [],
        strokeColor: '#0000FF',
        strokeWeight: 4
      });

      var lineSymbol = {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          strokeColor: '#00FF00',
          scale: 4
        };

      var polylineFromPoint = new google.maps.Polyline({
        path: [],
        strokeOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }],
      });

      var bounds = new google.maps.LatLngBounds();
       distanceCovered = 0
      var steps = response.routes[0].legs[0].steps;

      for (j=0;j<steps.length;j++) {
        var nextPathPart = steps[j].path;
        for (k=0;k<nextPathPart.length;k++) {
          if(k<nextPathPart.length-1){
            var path_origin = nextPathPart[k]
            var dest_path = nextPathPart[k+1]
            distanceCovered += google.maps.geometry.spherical.computeDistanceBetween(path_origin,dest_path)
          }
          if(distanceCovered <= distance){
            polylineToPoint.getPath().push(nextPathPart[k]);
          }
          else{
            if(polylineFromPoint.getPath().length == 0){
              var marker = new google.maps.Marker({
                position: path_origin,
                map: map,
                title: "Point Traveled To",
                label: "P"
              });
            }
            polylineFromPoint.getPath().push(nextPathPart[k]);
          }
          bounds.extend(nextPathPart[k]);
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
