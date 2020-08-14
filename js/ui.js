$(function() {

  //open sideNav on bars icon click
  $('.bars-icon').click(function() {
    $('#side-nav nav').addClass("open-sidenav");
  });

  //close sideNav
  $(document).click(function(e) {
    if( !$(e.target).closest('#side-nav')[0] && !$(e.target).hasClass('fa-bars') ) {
      $('#side-nav nav').removeClass('open-sidenav');
    }
  });

  // activate + sign when input:text inserted
  $('input:text').keyup(function() {
    ($(this).val()) ? $('#open-modal').addClass('add-active')
      : $('#open-modal').removeClass('add-active');
  });

  // open modal
  $('#open-modal').click(function() {
    if($('input:text').val()) {
      $('.modal').addClass('open-modal');
    }
  });

  // close modal on outside click
  $(document).click(function(e) {
    if( $(e.target)[0].id !== 'open-modal' && !$(e.target).closest(".modal-content")[0] ) {
      $(".modal").removeClass("open-modal");
    }
  }); 

  //add to the list
  $('.add-button').click(function() {
    let dayInList = selectedDay || day; 
    let formValues = { text: $('input:text').val(), dayInList, ...globalTime, checked: false };

    addToList(formValues);
    $(".modal").removeClass("open-modal");
    $('input:text').val('');
    $('#open-modal').removeClass('add-active');
  });

  //delete from the list
  $('body').on('click', '.delete-icon', function() {
    let idToDelete = $(this).closest('.list-item').attr('id');

    $(this).addClass('delete-clicked');
    setTimeout(() => deleteFromList(idToDelete), 500);
  });

  //check list item
  $('body').on('click', 'input:checkbox', function() {
    console.log($(this).attr('checked'));
    let checked = ($(this).attr('checked')) ? false : true;

    checkToDo($(this).attr('id'), checked);
  });

  // animation
  const features = [ ...$('.feature') ];
  animateOnAboutPage(features);

});