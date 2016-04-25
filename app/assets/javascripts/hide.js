$('.searches.index').ready(function(){
  $('#form_on_index').hide();

  $('#show_button').on('click', function(){
    $('#form_on_index').slideToggle();
    if($('#show_button').text()=="Show Search Form"){
      $('#show_button').text("Hide Search Form");
    }
    else{
      $('#show_button').text("Show Search Form");
    }   
  });
});

$('.searches.edit').ready(function(){
  $("#distance_in_miles").val(Math.round(getMiles($('#search_distance_traveled').val()*100))/100);
});