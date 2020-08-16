//Register the serviceWorker
if( 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register('/sw.js')
  .then(() => console.log('ServiceWorker Registered ...'));
}

let notificationPermisson;

const displayNotification = () => {
  if( 'serviceWorker' in navigator && notificationPermisson ) {
    let option = {
      body: $('#todo').val(),
      icon: '/icons/list(1).png',
      dir: 'rtl',
      vibrate: [200, 100, 200],
      badge: '/icons/list(1).png',
      tag: 'work-time-notif',
      renotify: true
      // actions: [{ action: 'confirm', title: 'Confirm' },
      //  { action: 'cancel', title: 'Cancel' }]
    };
    navigator.serviceWorker.ready.then((swReg) => {
      swReg.showNotification('اطلاع رسانی', option);
    });
  }
}

const askForNotification = (e) => {
  if( e.target.dataset.message === "enable" ){
    Notification.requestPermission((result) => {
      if( result !== 'granted' ) {
        return;
      }
      notificationPermisson = true;
      $(e.target).text('غیر فعالسازی');
      e.target.dataset.message = "disable";
      let addToList = document.getElementsByClassName('add-button');
      addToList[0].addEventListener("click", () => displayNotification());
  })
  }
  else {
    notificationPermisson = false;
    $(e.target).text(' فعالسازی');
    e.target.dataset.message = "enable";
  }
}

if( 'Notification' in window ) {
  $('#notification').removeClass('notification');
  $('#notification').click((e) => askForNotification(e));
}