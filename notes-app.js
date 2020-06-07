const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuidv4').uuid;
const app = express();
const port = process.env.PORT || 3000;

function createNote(noteText) {
  return {
    id: uuid(),
    text: noteText
  };
}

const notes = [
  createNote('http is a protocol'),
  createNote('http requests have a url, method, header, and body'),
  createNote('http methods used in forms or GET or POST'),
  createNote('http methods PUT and DELETE cannot be used in forms')
];

app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get('/', (req, res) => {
  res.render('notes', { notes: notes });
});

app.post('/delete-note/:noteId', (req, res) => {
  const noteToDeleteIndex = notes.findIndex(note => note.id === req.params.noteId)
  notes.splice(noteToDeleteIndex, 1);
  res.redirect('/');
});

app.post('/notes/:noteId', (req, res) => {
  const noteToUpdate = notes.find(note => note.id === req.params.noteId)
  noteToUpdate.text = req.body.note;
  res.redirect('/');
});

app.post('/notes', (req, res) => {
  const newNote = createNote(req.body.note);
  notes.push(newNote);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Web notes app starting on port ${port}`);
});
