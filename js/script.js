// js scripts

function updateNoteOnServer(noteId) {
  // find the note's textarea element by its id on the web page
  const noteEl = document.querySelector(`#note-${noteId}`);
  
  //get value from note textarea element
  const noteText = noteEl.value;

  // convert note value into form 
  const formData = new FormData();
  formData.append('note', noteText);

  fetch(`/notes/${noteId}`, {
    method: 'PUT',
    body: new URLSearchParams(formData)
  });
}

function deleteNote(noteId) {
  const cardWithNoteEl = document.querySelector(`#card-${noteId}`);
  cardWithNoteEl.remove();
  fetch(`/notes/${noteId}`, {
    method: 'DELETE'
  });
}
