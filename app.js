const express = require('express');
const app = express();
const connection = require('./db.js');

const port = 3001;

app.get('/', async(req, res) => {
    const users = await connection.query('SELECT * FROM users');
    console.log(users);
    res.send('Hello, Express!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});