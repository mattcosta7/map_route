$('.searches.new').ready(function(){

  count = 2;
  for(var i =2; i<10; i++){
    $($('.location_for_search')[i]).hide();
  }
  $('.show_another_location').on('click',function(){
    $($('.location_for_search')[count]).show();
    count++;
    if (count == 10){
      $('.show_another_location').hide();
    }
  });
});


$('.searches.edit').ready(function(){
  count = 0;
  for(var i=0; i< $('.location_for_search').length; i++){
    if($($('.location_for_search')[i]).find('.autocomplete').val() !== ""){
      $($('.location_for_search')[i]).show();
      count++;
      if(count == 10){
          $('.show_another_location').hide();
      }
    }
  }
});
