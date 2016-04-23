function getMiles(i) {
  return i*0.000621371192;
}
function getMeters(i) {
  return i*1609.344;
}

$('#new_search').ready(function(){
  $('#search_distance_traveled').on('keyup',function(){
    value = $(this).val()
    $('#distance_in_miles').val(getMiles(value))
  })

  $('#distance_in_miles').on('keyup',function(){
    value = $(this).val()
    $('#search_distance_traveled').val(getMeters(value))

  })
})