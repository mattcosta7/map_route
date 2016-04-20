function convertToMiles(meters){
  return meters/1609.34 
}

function convertToMeters(miles){
  return miles*1609.34
}

function converter(){
  document.getElementById('search_distance_traveled').addEventListener('change',function(){
    document.getElementById('distance_in_miles').value = parseFloat(convertToMiles(document.getElementById('search_distance_traveled').value))
  })

  document.getElementById('distance_in_miles').addEventListener('change',function(){
      document.getElementById('search_distance_traveled').value = parseFloat(convertToMeters(document.getElementById('distance_in_miles').value))
  })
}