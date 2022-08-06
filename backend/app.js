const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const checkToken = require('./middlewares/checkToken')
const PORT = process.env.PORT || 3000;
const patientRouter = require('./routers/patientRouter');
const userRouter = require('./routers/userRouter');
const doctorRouter = require('./routers/doctorRouter');
const StatusCodes = require('./utils/StatusCodes');

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
app.use('/patients', checkToken, patientRouter);
app.use('/users', userRouter);
app.use('/doctors', checkToken, doctorRouter);

// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(StatusCodes.INTERNAL_ERROR).json({ error: err });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
