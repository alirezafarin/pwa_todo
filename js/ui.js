let date = new persianDate();    
let year = date.format('YYYY');
let month = date.format('MMMM');
let day = date.calendar().day;
let week = date.format('dddd');
let dWeek = date.calendar().weekday;
let selectedDay;
let weekDays = [ "جمعه", "پنج", "چهار", "سه", "دو", "یک", "شنبه" ];

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

  //calendar top
  $('.top-week').text(week);
  $('.top-month').text(`${month} ${year}`);
  $('.top-day').text(day);

  // FIXME:
  //calendar bottom should show correct numbers for days > 31 and days < 1
  let calItem = Array.from($('.calender-item'));
  for( let i=1; i<=7; i++ ) {
    let dayInMonth = day - ( dWeek - (i) );
    dayInMonth = (dayInMonth <= 10) ? `0${dayInMonth}` : dayInMonth;  
    $(calItem[i-1]).find('.day').text(dayInMonth);
    $(calItem[i-1]).find('.week').text(weekDays[7-i]);

    if( dayInMonth === day ) {
      $(calItem[i-1]).find('.day').addClass('today');
    }
  }

  const followAlongSpan = (selectedDay) => {
    let coords = selectedDay.getBoundingClientRect();
    let y = coords.top + window.scrollY;
    let x = coords.left + window.scrollX;
    $('.selected-day-span').css({
      transform: `translate(${x}px, ${y}px)`,
      height: "32px",
      width: "32px"
    });
  } 

  //selectDay
  $('.day').click(function() {
    selectedDay = Number($(this).text());
    $('.selected-day').removeClass('selected-day');
    $(this).addClass('selected-day');
    followAlongSpan($(this)[0]);

    //show list for selected day
    showList(lists, selectedDay);
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

});