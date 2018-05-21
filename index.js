const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const {resolve} = require("path");
const credentials = require('./config/credentials');
const PORT = process.env.PORT || 9000;

const app = express();

const database = mysql.createConnection(credentials);

database.connect((err)=>{
    if(err) return console.log('CONNECTION ERROR:', err.message);

    console.log('database connection established');
});

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, "client", "dist")));

//Get Data by Flavor ID
app.get("/api/multiple-results",(req, res, next) => {
    let { flavor } = req.body;
    flavor = 1;

    let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
    let inserts =['juices-flavors', 'reviews', 'juices-flavors.review_id', 'reviews.id', 'juices', 'reviews.juice_id', 'juices.id', 'juices-flavors.flavor_id', flavor];

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

//Get Data by Flavor Name
app.get("/api/multiple-results",(req, res, next) => {
    let { flavor } = req.body;

    let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
    let inserts =['`flavors`', 'juices-flavors` b', '`b`.`flavor_id`', '`f`.`id`', '`reviews` r', '`r`.`id`', '`b`.`review_id`',  '`juices` j', '`j`.`id`', '`r`.`juice_id`', ' `f`.`flavor`', flavor];

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

//Get Single Juice Results
app.get("/api/single-results",(req, res, next) => {
    let { singleJuice } = req.body;
    singleJuice = 3;

    let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
    let inserts =['juices','reviews','juices.id','reviews.juice_id', 'juices.id', singleJuice];

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

//Get Flavors for Chart by juice_id
app.get("/api/single-results",(req, res, next) => {
    let { flavors } = req.body;
    flavors = 3;
// SELECT * from `reviews` JOIN `juices-flavors` ON `juices-flavors`.`reviews_id` = `reviews`.`juice_id` WHERE `reviews`.`juice_id` = 3
    let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
    let inserts =['juices','reviews','juices.id','reviews.juice_id', 'juices.id', flavors];

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

    let query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
    let inserts = ['users', 'username', 'password', 'email', 'created', 'role', username, password, 'NULL', 'CURRENT_TIMESTAMP', '1'];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    database.query(sql, (err, results, fields) => {
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

    let query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES ( ?, ?, ?, ?)';
    let inserts = ['juices', 'name', 'manufacturer_name', 'manufacturer_site', 'manufacturer_description', name, manufacturer, description, site];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    database.query(sql, (err, results, fields) => {
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

    let query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
    let inserts = ['reviews', 'rating', 'description', 'juice_id', 'user_id', rating, description, juice_id, user_id];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    database.query(sql, (err, results, fields) => {
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
    database.query(sql, (err, results, fields) => {
        if (err) return next(err);
        //authenticate user, start session
        const output = {
            success : true,
            data: results
        }
        res.json(output);
    })
});


//Get Flavor ID's
app.get("/api/test",(req, res, next) => {
    let { singleJuice } = req.body;
    singleJuice = 3;

    let query = 'SELECT * FROM ??';
    let inserts =['flavors'];

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
