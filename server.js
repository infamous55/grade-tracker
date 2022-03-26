const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

require('dotenv').config();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use(cors());
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1', apiLimiter, require('./routes'));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
