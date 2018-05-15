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
app.get("/api",(req, res, next) => {

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









app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server running at localhost:" + PORT);
}).on("error", (err) => {
    console.log("Server Error:", err.message);
    console.log("Do you already have a server running on PORT:" + PORT + "?");
});




