const sortOnTime = (lists) => {
  lists.sort((a, b) => {
    aData = a.doc.data();
    bData = b.doc.data();
    return (aData.hour + aData.minute) - (bData.hour + bData.minute);
  } );
}

const showList = (lists, day) => {
  $('.list-items').empty();

  sortOnTime(lists);

  lists.forEach((todo) => {
    let data = todo.doc.data();
    let checked = (data.checked) ? 'checked' : '';
    if( data.dayInList === day) {
      $('.list-items').append(`      
      <div id=${todo.doc.id} class="list-item d-flex align-items-center justify-content-start pr-4 border-bottom">
        <input
          class="checkbox"
          type="checkbox"
          id=${todo.doc.id}
          `+checked+`
        />
        <label
          class="list-item-info d-flex flex-column py-2 text-right"
          for={props.id}>
          <span class="list-item-text">${data.text}</span>
          <span class="list-item-time text-right">${data.hour}:${data.minute}</span>
        </label>
        <span class="delete-icon mr-auto"><i id="delete-icon" class="fa fa-times"></i></span>
      </div>`);
    }
  });
}


//fetch and show the list on change
let lists = [];
db.collection('lists').onSnapshot((snapshot) => {
  let id;
  if( snapshot.docChanges()[0].type === "removed" ) {
    id = snapshot.docChanges()[0].doc.id;
    lists = lists.filter((todo) => todo.doc.id !== id);
  }
  else if( snapshot.docChanges()[0].type === "added" ) {
    lists = [ ...lists, ...snapshot.docChanges() ];
  }
  else {
    id = snapshot.docChanges()[0].doc.id;
    lists = [ ...lists.filter((todo) => todo.doc.id !== id), ...snapshot.docChanges()];
  };
  showList(lists, selectedDay || day);
});

const addToList = async(formValues) => {
  await db.collection('lists').add(formValues)
  .catch((err) => console.log(err));
}

const deleteFromList = async(id) => {
  await db.collection('lists').doc(id).delete()
  .catch((err) => console.log(err));
}

const checkToDo = async(id, checked) => {
  await db.collection('lists').doc(id).update({
    checked
  }).catch((err) => console.log(err));
}