const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'luserdb.c96oeismsbzb.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'cmri1984',
    database: 'userdb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Login route
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.query(query, [username, password], (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                res.send('Login successful!');
            } else {
                res.send('Invalid username or password!');
            }
        });
    } else {
        res.send('Please enter username and password!');
    }
});

// Start server
const PORT = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
