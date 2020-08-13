const animateOnClick = (element, classToAdd) => {
  $(element).addClass(classToAdd);
  setTimeout(() => $(element).removeClass(classToAdd), 500 );
}


const animateOnAboutPage = (features) => {

  setTimeout(() => {
    $(features[0]).addClass('slide-right');
  }, 200);

  setTimeout(() => {
    $(features[1]).addClass('slide-left');
  }, 500);

  setTimeout(() => {
    $(features[2]).addClass('slide-right');
  }, 700);

  setTimeout(() => {
    $(features[3]).addClass('slide-left');
  }, 900);

  setTimeout(() => {
    $(features[4]).addClass('slide-right');
  }, 1100);

  setTimeout(() => {
    $(features[5]).addClass('slide-left');
  }, 1300);
}