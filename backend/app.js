const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/', (req, res, next) => {
    res.json('Hello world');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ error: err });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
