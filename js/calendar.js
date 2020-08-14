//calendar top
$('.top-week').text(week);
$('.top-month').text(`${month} ${year}`);
$('.top-day').text(day);

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

let addTodayClass = (dayElem) => {
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

let weekDay = findFirstWeekDay(weekNumber, day);
let limit = findMonthLimit(monthNumber);
let days = [ ...$('.day') ];

// render days
days.forEach((dayElem) => {
  let dayToShow = (weekDay <= 10) ? `0${weekDay}` : weekDay;  
  $(dayElem).text(dayToShow);

  addTodayClass(dayElem);

  weekDay = findNextDay(weekDay);
});