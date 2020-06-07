const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const notes = [
  'http is a protocol',
  'http requests have a url, method, header, and body',
  'http methods used in forms or GET or POST',
  'http methods PUT and DELETE cannot be used in forms'
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
  notes.splice(req.params.noteId, 1)
  res.redirect('/');
});

app.post('/notes/:noteId', (req, res) => {
  notes[req.params.noteId] = req.body.note;
  res.redirect('/');
});

app.post('/notes', (req, res) => {
  notes.push(req.body.note);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Web notes app starting on port ${port}`);
});
