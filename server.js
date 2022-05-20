const express = require('express');

const app = express();

app.listen(1024, () => {
    console.log(`API server now on port 1024!`);
  });