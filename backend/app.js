const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    res.json('Hello world');
})

app.listen(3000, () => {console.log('listen on port 3000')})