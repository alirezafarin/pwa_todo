const animateOnClick = (element, classToAdd) => {
  $(element).addClass(classToAdd);
  setTimeout(() => $(element).removeClass(classToAdd), 500 );
}


const animateOnAboutPage = (features) => {
  setTimeout(() => {
    $(features[0]).addClass('animate-in');
  }, 200);

  setTimeout(() => {
    $(features[1]).addClass('animate-in');
  }, 500);

  setTimeout(() => {
    $(features[2]).addClass('animate-in');
  }, 700);

  setTimeout(() => {
    $(features[3]).addClass('animate-in');
  }, 900);

  setTimeout(() => {
    $(features[4]).addClass('animate-in');
  }, 1100);

  setTimeout(() => {
    $(features[5]).addClass('animate-in');
  }, 1300);
}