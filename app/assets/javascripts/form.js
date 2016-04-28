$('searches.new').ready(function(){
  keeper = 0;
  for(var i = 0; i < $('.waypoints_for_search').length; i++){
    if ( $($('.waypoints_for_search')[i]).find('input').val() === '' ){
      $($('.waypoints_for_search')[i]).hide();
    }
    else{
      keeper++;
    }
  }

  $('.show_another_location').on('click',function(){
    if(keeper < 8){
      $($('.waypoints_for_search')[keeper]).show();
    }
    keeper++;
    if(keeper == 8){
      $('.show_another_location').hide();
    }
  });
});
