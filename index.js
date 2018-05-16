const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const {resolve} = require("path");
const credentials = require('./config/credentials');
const PORT = process.env.PORT || 9000;

const app = express();

const database = mysql.createConnection(credentials);

database.connect((err)=>{
    if(err) throw err;

    console.log('databse connection established');
});

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, "client", "dist")));


// example response
app.get("/api/test",(req, res, next) => {

    let query = 'SELECT * FROM ??';
    let inserts =['juices'];

    let sql = mysql.format(query, inserts);

    console.log(sql);

    database.query(sql, (err,results,field)=>{
        if(err) return next (err);

        const output = {
            success: true,
            data: results
        }
        res.json(output);
    });
});

// create user
app.post("/api/create-user",(req, res, next) => {
    const {username, password} = req.body;

    let query = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
    let inserts = ['users', 'id', 'username', 'password', 'email', 'created', 'role', 'NULL', username, password, 'NULL', 'CURRENT_TIMESTAMP', '1'];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    connection.query(sql, (err, results, fields) => {
        if (err) return next(err);
        const output = {
            success : true,
            data: results
        }
        res.json(output);
    })
});

//add product
app.post('/api/add-product', (req,res,next)=>{
    const {name, manufacturer, description, site} = req.body;

    let query = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
    let inserts = ['juices', 'id', 'name', 'manufacturer', 'description', 'site', 'NULL', name, manufacturer, description, site];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    connection.query(sql, (err, results, fields) => {
        if (err) return next(err);
        const output = {
            success : true,
            data: results
        }
        res.json(output);
    })
});

//add review
app.post('/api/add-review', (req,res,next)=>{
    const {rating, description, juice_id, user_id} = req.body;

    let query = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
    let inserts = ['reviews', 'id', 'rating', 'description', 'juice_id', 'user_id', 'NULL', rating, description, juice_id, user_id];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    connection.query(sql, (err, results, fields) => {
        if (err) return next(err);
        const output = {
            success : true,
            data: results
        }
        res.json(output);
    })
});

//authenticate user
app.get('/api/log-in', (req,res,next)=>{
    const  {username, password} = req.body;

    let query = 'SELECT `username`, `password` FROM `users` WHERE `username` = ??';
    let inserts = [username];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    connection.query(sql, (err, results, fields) => {
        if (err) return next(err);
        //authenticate user, start session
        const output = {
            success : true,
            data: results
        }
        res.json(output);
    })
});






app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server running at localhost:" + PORT);
}).on("error", (err) => {
    console.log("Server Error:", err.message);
    console.log("Do you already have a server running on PORT:" + PORT + "?");
});




