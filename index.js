const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const { resolve } = require("path");
const credentials = require('./config/credentials');
const PORT = process.env.PORT || 9000;

const app = express();

const database = mysql.createConnection(credentials);

database.connect((err) => {
    if (err) return console.log('CONNECTION ERROR:', err.message);

    console.log('database connection established');
});

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, "client", "dist")));


// Browse button on landing page - returns all juices
app.get("/api/multiple-results-browse", (req, res, next) => {
    const query = 'SELECT * FROM `juices` LEFT JOIN `reviews` ON `juices`.`id` = `reviews`.`juice_id`';
    const sql = mysql.format(query);

    console.log(sql);

    database.query(sql, (err, results, field) => {
        if (err) return next(err);

        const output = {
            success: true,
            data: results
        }
        res.json(output);
    });
});

// Random juice button on landing page - gets single random juice 
app.get("/api/random-juice",(req, res, next) => {
    const query = 'SELECT * FROM `juices` ORDER BY RAND() LIMIT 1';
    const sql = mysql.format(query);

    console.log(sql);

    database.query(sql, (err, results, field) => {
        if (err) return next(err);

        const output = {
            success: true,
            data: results
        }
        res.json(output);
    });
});

//  Landing page search by query - allows for search by juice name, manufactuer name, flavor name or flavor category 
app.get("/api/multiple-results", (req, res, next) => {
    const { input } = req.query;

    const query = 'SELECT `j`.*, `r`.`rating`,`r`.`id` AS review_id, `c`.`category`, `f`.`flavor` from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` LEFT JOIN `flavors` as f ON `f`.`id` = `juices-flavors`.`flavor_id` LEFT JOIN `category` as c ON `c`.`id` = `f`.`catagory_id` WHERE `j`.`name` = ? OR `j`.`manufacturer_name` = ? OR `f`.`flavor` = ? OR `c`.`category` = ?';
    const inserts = [input, input, input, input] ;

    const sql = mysql.format(query, inserts);

    console.log(sql);

    database.query(sql, (err, results, field) => {
        if (err) return next(err);

        const output = {
            success: true,
            data: results
        }
        res.json(output);
    });
});

//Get Single Juice Results	
app.get("/api/single-juice", (req, res, next) => {	
        const { juice_id } = req.body;
        
        const query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
        const inserts = ['juices', 'reviews', 'juices.id', 'reviews.juice_id', 'juices.id', juice_id];
          
        let sql = mysql.format(query, inserts);
    	
        console.log(sql);	
    	
        database.query(sql, (err, results, field) => {	
            if (err) return next(err);	
    	
            const output = {	
                success: true,	
               data: results	
            }	
            res.json(output);	
        });	
    });

// Flavor chart on single results page - gets flavor breakdown of each juice
app.get("/api/flavor-chart", (req, res, next) => {
    const { juice_id } = req.body;
    
    const query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
    const inserts = ['juices', 'reviews', 'juices.id', 'reviews.juice_id', 'juices.id', juice_id];

    const sql = mysql.format(query, inserts);

    console.log(sql);

    database.query(sql, (err, results, field) => {
        if (err) return next(err);

        const output = {
            success: true,
            data: results
        }
        res.json(output);
    });
});


// create user -- use product or review instead of add-review because POST methods imply addition or creation 
app.post("/api/create-user", (req, res, next) => {
    const { username, password } = req.body;

    const query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
    const inserts = ['users', 'username', 'password', 'email', 'created', 'role', username, password, 'NULL', 'CURRENT_TIMESTAMP', '1'];

    const sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    database.query(sql, (err, results, fields) => {
        if (err) return next(err);
        const output = {
            success: true,
            data: results
        }
        res.json(output);
    })
});

//add product
app.post('/api/add-product', (req, res, next) => {
    const { name, manufacturer, description, site } = req.body;

    const query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES ( ?, ?, ?, ?)';
    const inserts = ['juices', 'name', 'manufacturer_name', 'manufacturer_site', 'manufacturer_description', name, manufacturer, site, description ];

    const sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    database.query(sql, (err, results, fields) => {
        if (err) return next(err);
        const output = {
            success: true,
            data: results
        }
        res.json(output);
    })
});

//add review - !important!!!!!!

app.post('/api/add-review', (req, res, next) => {
    const { rating, description, juice_id, user_id, flavor1, flavor2, flavor3 } = req.body;

    let query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
    let inserts = ['reviews', 'rating', 'description', 'juice_id', 'user_id', rating, description, juice_id, user_id];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    database.query(sql, (err, results, fields) => {
        if (err) return res.status(500).send('Error saving review'); ///make function, pass in message, res, sttus code to enable logging, put in endpoint that receives error messages
        let output = {
            success: true,
            data: results
        }
        const reviewId = results.insertId

        res.json(output);

        if (output.success) {
            let query = 'SELECT * FROM ?? WHERE ?? = ? OR ? OR ?'
            let inserts = ['flavors', 'flavors.flavor', flavor1, flavor2, flavor3]

            let sql = mysql.format(query, inserts);
            console.log("This is the formatted SQL", sql);
            database.query(sql, (err, results, fields) => {
                if (err) return next(err);
                let output = {
                    success: true,
                    data: results
                }
                const flavorId1 = output.data[0].id
                console.log('output', flavorId1)

                if (output.success) {
                    let query = 'INSERT INTO ?? (??, ??) VALUES (?, ?),(?, ?),(?, ?)'
                    let inserts = ['juices-flavors', 'review_id', 'flavor_id', reviewId, flavorId1]
        
                    let sql = mysql.format(query, inserts);
                    console.log("This is the formatted SQL", sql);
                    database.query(sql, (err, results, fields) => {
                        if (err) return next(err);
                        let output = {
                            success: true,
                            data: results
                        }
                    })
                }
            })
        }
    });
});

    //authenticate user
    app.get('/api/log-in', (req, res, next) => {
        const { username, password } = req.body;

        let query = 'SELECT `username`, `password` FROM `users` WHERE `username` = ??';
        let inserts = [username];

        let sql = mysql.format(query, inserts);
        console.log("This is the formatted SQL", sql);
        database.query(sql, (err, results, fields) => {
            if (err) return next(err);
            //authenticate user, start session
            const output = {
                success: true,
                data: results
            }
            res.json(output);
        })
    });


    //Get Flavor Categorys
    app.get("/api/category-modal", (req, res, next) => {

        let query = 'SELECT * FROM ??';
        let inserts = ['category'];

        let sql = mysql.format(query, inserts);

        console.log(sql);

        database.query(sql, (err, results, field) => {
            if (err) return next(err);

            const output = {
                success: true,
                data: results
            }
            res.json(output);
        });
    });

    //Get Flavors by category ID
    app.get("/api/flavor-modal", (req, res, next) => {
        let { category } = req.body;

        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = ['flavors', 'category_id', category];

        let sql = mysql.format(query, inserts);

        console.log(sql);

        database.query(sql, (err, results, field) => {
            if (err) return next(err);

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
