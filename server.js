const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

require('dotenv').config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use(require('./routes'));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
