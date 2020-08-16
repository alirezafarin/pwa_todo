let date = new persianDate();    
let year = date.format('YYYY');
let month = date.format('MMMM');
let monthNumber = date.month();
let day = date.calendar().day;
let week = date.format('dddd');
let weekNumber = date.calendar().weekday;
let selectedDay;

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

let findMonthLimit = (monthNumber) => {
  let limit = (monthNumber <= 6) ? 31 : 30;
  return limit;
}

let findFirstWeekDay = (weekNumber, weekDay) => {
  for( let i=1; i<weekNumber; i++ ) {
    weekDay--;
    if( weekDay < 1 ) {
      weekDay = findMonthLimit(monthNumber);
    }
  }
  return weekDay;
}

let addTodayClass = (dayElem, weekDay) => {
  if( day === weekDay ) {
    $(dayElem).addClass('today');
  } 
}

let findNextDay = (nextDay) => {
  nextDay ++;
  if( nextDay > limit ) {
    nextDay = 1;
  }
  return nextDay
}

let findLastDay = (lastDay) => {
  lastDay --;
  if(lastDay < 1) {
    lastDay = limit;
  }
  return lastDay;
}

const renderDays = (weekDay) => {
  days.forEach((dayElem) => {
    let dayToShow = (weekDay < 10) ? `0${weekDay}` : weekDay;  
    $(dayElem).text(dayToShow);
    
    addTodayClass(dayElem, weekDay);
  
    weekDay = findNextDay(weekDay);
  });
}

const disableChangeWeek = (lastOrNextSpan) => {
  ( $('.disable').length === 0 )
    ? $(lastOrNextSpan).addClass('disable')
    : $('.disable').removeClass('disable');
}

//calendar top
$('.top-week').text(week);
$('.top-month').text(`${month} ${year}`);
$('.top-day').text(day);

let weekDay = findFirstWeekDay(weekNumber, day);
let limit = findMonthLimit(monthNumber);
let days = [ ...$('.day') ];

renderDays(weekDay);

//selectDay
$('.day').click(function() {
  selectedDay = Number($(this).text());
  $('.selected-day').removeClass('selected-day');
  $(this).addClass('selected-day');
  followAlongSpan($(this)[0]);

  //show list for selected day
  showList(lists, selectedDay);
});

// next last week
$('#next, #last').click((e) => {
  let lastOrNextSpan = $(e.target).closest('span');
  let whichWeek = $(lastOrNextSpan).attr('id');

  if( !$(lastOrNextSpan).hasClass('disable') ) {
    // animate on click
    $(lastOrNextSpan).addClass('animate-on-change');
    disableChangeWeek(lastOrNextSpan);
    //empty todo list
    $('.list-items').empty();
    $('.today').removeClass('today');

    if( whichWeek === 'next' ) {
      let days = $('.day');
      let lastDayOfWeek = Number($(days[6]).text());
      let nextWeek1Day = findNextDay(lastDayOfWeek);
      renderDays(nextWeek1Day);
    }
    else {
      let days = $('.day');
      let firstDayOfWeek = Number($(days[0]).text());
      let lastWeek7Day = findLastDay(firstDayOfWeek);
      let lastWeek1Day = findFirstWeekDay(7, lastWeek7Day);
      renderDays(lastWeek1Day);
    }
  }
});

// remove animation on end
$('#last, #next').on('animationend', () => {
  $('.animate-on-change').removeClass('animate-on-change');
})