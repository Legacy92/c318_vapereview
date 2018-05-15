// import { INSPECT_MAX_BYTES } from "buffer";

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

app.get("/api",(req, res, next) => {
    // res.send('tis working');

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

app.post("/api/send-data", (req, res) => {
    console.log("Data sent:", req.body);

    res.send({success: true, mirror: req.body});
});

app.get("/api/user-data", (req, res) => {
    const user = {
        "name": "jim Bob",
        "email": "jimsmom@mail.com"
    };

    res.send(user);
});

app.get('/api/get-article', (req, res) => {
    const article = {
        "title": "The man comes around",
        "author": "Johnny Cash",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto delectus, dolorem dolores enim fuga hic laborum provident reiciendis sapiente."
    };

    res.send(article);
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




