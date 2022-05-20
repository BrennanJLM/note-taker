const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/public/index.html', (req, res) => {
  res.send('Hello!');
});

app.get('/public/notes.html', (req, res) => {
  res.send('Hello!');
});

app.post('/public/index.html', (req, res) => {
  console.log(req.body);
  res.json(req.body);
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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });