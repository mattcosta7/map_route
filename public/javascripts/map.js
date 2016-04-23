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
  //get directions made
  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      totalDist = response.routes[0].legs[0].distance
      //get steps of directions
      //use the paths of each step to draw route
      document.getElementById('distance_placeholder').innerHTML = totalDist.value
      document.getElementById('distance_placeholder_2').innerHTML = totalDist.text +"les"
      document.getElementById('distance_to_travel').innerHTML = totalDist.value > distance_traveled ? (totalDist.value - distance_traveled) : 'nil';
      document.getElementById('distance_to_travel_2').innerHTML = (totalDist.value > distance_traveled ? (Math.round(getMiles(totalDist.value - distance_traveled),5) + " miles") : "passed your destination, dude");

      var steps = response.routes[0].legs[0].steps;

      plotMap(steps, distance_traveled);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function plotMap(steps,distance_traveled){

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
  distanceCovered = 0;
  for (j=0;j<steps.length;j++) {
    var nextPathPart = steps[j].path;
    for (k=0;k<nextPathPart.length;k++) {
      if(k<nextPathPart.length-1){
        var path_origin = nextPathPart[k]
        var dest_path = nextPathPart[k+1]
        var distToCover = google.maps.geometry.spherical.computeDistanceBetween(path_origin,dest_path)
        if(distanceCovered > distance_traveled){
          polylineFromPoint.getPath().push(nextPathPart[k]);
        }
        else{
          if(distanceCovered < distance_traveled && distToCover + distanceCovered >= distance_traveled){
          percentToTravel = (distance_traveled - distanceCovered) / distToCover;

          interp_result = google.maps.geometry.spherical.interpolate(path_origin,dest_path, percentToTravel);

          var marker = new google.maps.Marker({
            position: interp_result,
            map: map,
            title: "Point Traveled To",
            label: "X"
          });
          }
          distanceCovered += distToCover;
        }
        if(distanceCovered <= distance_traveled){
          polylineToPoint.getPath().push(nextPathPart[k]);
        }
      }
      bounds.extend(nextPathPart[k]);
    }
  }
  polylineToPoint.setMap(map);
  polylineFromPoint.setMap(map);
  map.fitBounds(bounds);
}