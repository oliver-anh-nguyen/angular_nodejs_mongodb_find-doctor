const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const patientRouter = require('./routers/patientRouter');
const ErrorCodes = require('./utils/ErrorCodes');

// Connect to DB
const DBURL = process.env.DBURL || 'mongodb://localhost:27017/finddoctor';
mongoose.connect(DBURL, (err) => {
    if (err) {
        console.log('Mongoose: failed to connect to db', err);
    } else {
        console.log('Mongoose: connected to DB');
    }
});

// Create app
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// Routers
app.use('/patients', patientRouter);

app.use('/', (req, res, next) => {
    res.json('Hello world');
});

// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(ErrorCodes.INTERNAL_ERROR).json({ error: err });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
