const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');

const app = express();
const port = 3000;

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User routes
app.use('/api/users/', users);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.export