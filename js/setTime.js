globalTime = { hour: '00', minute: '00' };

setTime = (e) => {
  if(e.target.dataset.time) {
    let limit = { hour: 23, minute: 59 }
    let time = e.target.dataset.time;
    let AddOrSub = e.target.dataset.dir;
    let timeNow = $(`.${time}-now`).text();
    let timeAfter = Number(timeNow);
    //add or subtract one
    (AddOrSub === 'up') ? timeAfter ++ : timeAfter --;
    //if negative back to limit if limit back to zero
    let stateTime = (timeAfter < 0 ) ? String(limit[time])
              : (timeAfter <= 9) ? '0' + String(timeAfter)
              : (timeAfter > limit[time]) ? "00"
              : String(timeAfter);      

    globalTime[time] = stateTime;
    $(`.${time}-now`).text(globalTime[time]);

    animateOnClick(`.${time}-now`, 'selected-time');
    animateOnClick(e.target, 'clicked-arrow');
  }
}

$('.clock').click((e) => setTime(e));