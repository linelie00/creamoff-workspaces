const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 8282;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});