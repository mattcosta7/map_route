function initMap() {
  var origin = searchOrigin;
  var destination = searchDestination;
  var waypoints = [];
  var distanceTraveled = distance;
  map = new google.maps.Map(document.getElementById('map'), {});
  infowindow = new google.maps.InfoWindow();
  for(var i = 0; i < searchWaypoints.length; i++){
    waypoints.push({location: new google.maps.LatLng(searchWaypoints[i].lat,searchWaypoints[i].lng), stopover: true});
  }
  placeMarker(origin,"origin");
  placeMarker(destination,"destination");
  calculateAndDisplayRoute(origin,destination,distanceTraveled, waypoints, optimize);
}

function calculateAndDisplayRoute(origin, destination,distanceTraveled, waypoints, optimize=false) {
  var directionsService = new google.maps.DirectionsService();
  var routeOptions = {
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    optimizeWaypoints: optimize,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(routeOptions, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      var totalRouteDistance = 0;
      legs = response.routes[0].legs;
      for(var z = 0; z<legs.length;z++){
        totalRouteDistance += legs[z].distance.value;
      }
      updateDisplay(totalRouteDistance, distanceTraveled);
      plotMap(legs, distanceTraveled);
    }
    else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function plotMap(legs,distanceTraveled){

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
  for(i=0;i<legs.length;i++) {
    if(i < legs.length-1){
      placeMarker(legs[i].end_location, "WayPoint");
    }
    var steps = legs[i].steps;
    for (j=0;j<steps.length;j++) {
      var nextPathPart = steps[j].path;
      for (k=0;k<nextPathPart.length;k++) {
        if(k<nextPathPart.length-1){
          var pathOrigin = nextPathPart[k];
          var pathDestination = nextPathPart[k+1];
          var distToCover = google.maps.geometry.spherical.computeDistanceBetween(pathOrigin,pathDestination);
          if(distanceCovered > distanceTraveled){
            polylineFromPoint.getPath().push(nextPathPart[k]);
          }
          else if(distanceCovered < distanceTraveled && distToCover + distanceCovered >= distanceTraveled){
            percentToTravel = (distanceTraveled - distanceCovered) / distToCover;

            var interpResult = google.maps.geometry.spherical.interpolate(pathOrigin,pathDestination, percentToTravel);

            placeMarker(interpResult, 'point');
            polylineToPoint.getPath().push(interpResult);
            polylineFromPoint.getPath().push(interpResult);
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
  }
  polylineToPoint.setMap(map);
  polylineFromPoint.setMap(map);
  map.fitBounds(bounds);
}

function placeMarker(location,type){
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
  document.getElementById('distance_placeholder').innerHTML = totalDist;
  document.getElementById('distance_placeholder_2').innerHTML = Math.round(getMiles((totalDist)*10))/10 + " miles";
  document.getElementById('distance_to_travel').innerHTML = totalDist > distanceTraveled ? Math.round((totalDist - distanceTraveled)*10)/10 : 'nil';
  document.getElementById('distance_to_travel_2').innerHTML = (totalDist > distanceTraveled ? (Math.round(getMiles((totalDist - distanceTraveled)*10))/10 + " miles") : "passed your destination, dude");
}
