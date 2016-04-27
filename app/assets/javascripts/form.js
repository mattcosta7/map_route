$('.searches.new').ready(function(){



  count = 2;
  for(var i =2; i<8; i++){
    $($('.location_for_search')[i]).hide();
  }
  $('.show_another_location').on('click',function(){
    $($('.location_for_search')[count]).show();
    count++;
    if (count == 8){
      $('.show_another_location').hide();
    }
  });
});
