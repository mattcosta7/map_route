function initMap() {
  $.ajax({
    url: window.location.pathname,
    method: 'get',
    success:function(response){
      var origin = {lat: response.lat1, lng: response.lng1};
      var destination = {lat: response.lat2, lng: response.lng2};
      var distanceTraveled = response.distance_traveled;

      map = new google.maps.Map(document.getElementById('map'), {});
      infowindow = new google.maps.InfoWindow();
      placeMarker(origin,"origin");
      placeMarker(destination,"destination");

      calculateAndDisplayRoute(origin,destination,distanceTraveled);
    }
  });
}

function calculateAndDisplayRoute(origin, destination,distanceTraveled) {
  var directionsService = new google.maps.DirectionsService();
  var routeOptions = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(routeOptions, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      var totalRouteDistance = response.routes[0].legs[0].distance;
      updateDisplay(totalRouteDistance, distanceTraveled);
      var steps = response.routes[0].legs[0].steps;
      plotMap(steps, distanceTraveled);
    }
    else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function plotMap(steps,distanceTraveled){

  var polylineToPoint = new google.maps.Polyline({
    path: [],
    strokeColor: '#0000FF',
    strokeWeight: 4
  });

  var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      strokeColor: '#0000FF',
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
        var path_origin = nextPathPart[k];
        var dest_path = nextPathPart[k+1];
        var distToCover = google.maps.geometry.spherical.computeDistanceBetween(path_origin,dest_path);
        if(distanceCovered > distanceTraveled){
          polylineFromPoint.getPath().push(nextPathPart[k]);
        }
        else if(distanceCovered < distanceTraveled && distToCover + distanceCovered >= distanceTraveled){
          percentToTravel = (distanceTraveled - distanceCovered) / distToCover;

          var interp_result = google.maps.geometry.spherical.interpolate(path_origin,dest_path, percentToTravel);

          placeMarker(interp_result, 'point', distanceCovered);
          polylineToPoint.getPath().push(interp_result);
          polylineFromPoint.getPath().push(interp_result);
          }
        else{
          polylineToPoint.getPath().push(nextPathPart[k]);
        }
        distanceCovered += distToCover;
      }
      else{
        if(distanceCovered >= distanceTraveled){
          polylineFromPoint.getPath().push(nextPathPart[k]);
        }
        else{
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

function placeMarker(location,type,dist){
  if(type=="point"){
    options = {
      icon: {
        url: window.location.origin + '/assets/face.jpg',
        size: new google.maps.Size(20, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
      },
      title: "Point traveled to",
    };
  }
  else{
    options = {
      label: type[0],
      title: type
    };
  }
  var marker = new google.maps.Marker({
    position: location,
    map: map,

    animation: google.maps.Animation.DROP,
    options
  });
   google.maps.event.addListener(marker, 'click', function(){
    infowindow.close();
    infowindow.setContent(this.title);
    infowindow.open(map, marker);
  });
}


function updateDisplay(totalDist, distanceTraveled){
  document.getElementById('distance_placeholder').innerHTML = totalDist.value;
  document.getElementById('distance_placeholder_2').innerHTML = Math.round(getMiles((totalDist.value)*10))/10 + " miles";
  document.getElementById('distance_to_travel').innerHTML = totalDist.value > distanceTraveled ? Math.round((totalDist.value - distanceTraveled)*10)/10 : 'nil';
  document.getElementById('distance_to_travel_2').innerHTML = (totalDist.value > distanceTraveled ? (Math.round(getMiles((totalDist.value - distanceTraveled)*10))/10 + " miles") : "passed your destination, dude");
}
