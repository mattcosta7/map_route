$('.searches.index').ready(function(){
  $('#form_on_index').hide();

  $('#show_button').on('click', function(){
    $('#form_on_index').slideToggle();
    if($('#show_button').text()=="Show Search Form"){
      $('#show_button').text("Hide Search Form");
    }
    else{
      $('#show_button').text("Show Search Form")
    }   
  })
})

$('.searches.show').ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });