const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');

app.set('views', path.join(__dirname, 'Develop\\views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Develop\\public')));    //TODO: look in to this - cannot load assets (404)



app.get('/', (req, res, next) => {
  let existing_notes = getExistingNotes();
  res.render('index', {title: 'title'});     //TODO: look in to this - options are not passing to template (EJS)
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get('/notes', (req, res) => {
  res.render('notes');
});

app.use(async(req, res, next) => {
  next(createError(404));
});
app.use(async(err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});





function createNewNote(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  return animal;
}

let getExistingNotes = () => {
  let existing = [];

  //put code here to find notes

  return [{title:'note1'}, {title:'note2'}];
  //return existing;
};

