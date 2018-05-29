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
    const query = 'SELECT `j`.*, AVG(`r`.`rating`) as rating from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` GROUP BY 1,2,3,4,5';
    const sql = mysql.format(query);

    console.log(sql);

    database.query(sql, (err, results, field) => {
        if (err) return res.status(500).send('Error Getting Results For Browse Button');

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
        if (err) return res.status(500).send('Error Getting Random Juice');

        const output = {
            success: true,
            data: results
        }
        console.log(output.data);
        res.json(output);
    });
});

//  Landing page search by query - allows for search by juice name, manufactuer name, flavor name or flavor category 
app.get("/api/multiple-results", (req, res, next) => {
    const { input } = req.query;

    const query = 'SELECT `j`.*, AVG(`r`.`rating`) as rating from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` LEFT JOIN `flavors` as f ON `f`.`id` = `juices-flavors`.`flavor_id` LEFT JOIN `category` as c ON `c`.`id` = `f`.`catagory_id` WHERE `j`.`name` = ? OR `j`.`manufacturer_name` = ? OR `f`.`flavor` = ? OR `c`.`category` = ? GROUP BY 1,2,3,4,5';
    const inserts = [input, input, input, input] ;

    const sql = mysql.format(query, inserts);

    console.log(sql);

    database.query(sql, (err, results, field) => {
        if (err) return res.status(500).send('Error Searching For Results');

        const output = {
            success: true,
            data: results
        }
        res.json(output);
    });
});

//Get Single Juice Results	
app.get("/api/single-juice-info", (req, res, next) => {	
        const { juice_id } = req.query;
        
        const query = 'SELECT `juices`.*, AVG(`reviews`.`rating`) as rating FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
        const inserts = ['juices', 'reviews', 'juices.id', 'reviews.juice_id', 'juices.id', juice_id];
          
        let sql = mysql.format(query, inserts);
    	
        console.log(sql);	
    	
        database.query(sql, (err, results, field) => {	
            if (err) return res.status(500).send('Error Getting Resutls For Single Juice Page');	
    	
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
        if (err) return res.status(500).send('Error Getting Data for Flavor Graph');

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
        if (err) return res.status(500).send('Error Creating User Account');
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
        if (err) return res.status(500).send('Error Adding Product');
        const output = {
            success: true,
            data: results
        }
        res.json(output);
    })
});

//add review

app.post('/api/add-review', (req, res, next) => {
    const { rating, description, juice_id, user_id, flavor1, flavor2, flavor3 } = req.body;

    let query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
    let inserts = ['reviews', 'rating', 'description', 'juice_id', 'user_id', rating, description, juice_id, user_id];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    database.query(sql, (err, results, fields) => {
        if (err) return res.status(500).send('Error Adding Review');
        let output = {
            success: true,
            data: results
        }
        const reviewId = results.insertId

        res.json(output);
// get flavor ID's for added flavors
        if (output.success) {
            let query = 'SELECT * FROM ?? WHERE ?? IN (?, ?, ?)'
            let inserts = ['flavors', 'flavor', flavor1, flavor2, flavor3]

            let sql = mysql.format(query, inserts);
            console.log("This is the formatted SQL", sql);
            database.query(sql, (err, results, fields) => {
                if (err) return res.status(500).send('Error Getting Flavor IDs');
                console.log(results);
                let output = {
                    success: true,
                    data: results
                }
                const flavorId1 = output.data[0].id
                const flavorId2 = output.data[1].id
                const flavorId3 = output.data[2].id
// insert reviews with flavors into juices-flavors table
                if (output.success) {
                    let query = 'INSERT INTO ?? (??, ??) VALUES (?, ?),(?, ?),(?, ?)'
                    let inserts = ['juices-flavors', 'review_id', 'flavor_id', reviewId, flavorId1, reviewId, flavorId2, reviewId, flavorId3 ]
        
                    let sql = mysql.format(query, inserts);
                    console.log("This is the formatted SQL", sql);
                    database.query(sql, (err, results, fields) => {
                        if (err) return res.status(500).send('Error Adding Review/Flavor IDs');
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
            if (err) return res.status(500).send('Error Authenticating User');
            //authenticate user, start session
            const output = {
                success: true,
                data: results
            }
            res.json(output);
        })
    });


    //Get Flavor Categories
    app.get("/api/category-modal", (req, res, next) => {

        let query = 'SELECT * FROM ??';
        let inserts = ['category'];

        let sql = mysql.format(query, inserts);

        console.log(sql);

        database.query(sql, (err, results, field) => {
            if (err) return res.status(500).send('Error Getting Flavor Categories');

            const output = {
                success: true,
                data: results
            }
            res.json(output);
        });
    });

    //Get Flavors by category ID
    app.get("/api/flavor-modal", (req, res, next) => {
        let { category } = req.query;

        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = ['flavors', 'catagory_id', category];

        let sql = mysql.format(query, inserts);

        console.log(sql);

        database.query(sql, (err, results, field) => {
            if (err) {
                console.log('ERROR:', err.message);
                return res.status(500).send('Error Getting Flavors');
            }

            const output = {
                success: true,
                data: results
            }
            res.json(output);
        });
    });


//Get All Reviews for Single Juice
app.get("/api/single-juice-reviews", (req, res, next) => {	
        const juiceId  = req.query[Object.keys(req.query)[0]];
        console.log(juiceId);
        
        
        const query = 'SELECT `id`,`rating`, `description` as review, `juice_id`, `user_id`, `created` FROM ?? WHERE ?? = ?';
        const inserts = ['reviews', 'reviews.juice_id', juiceId];
          
        let sql = mysql.format(query, inserts);
    	
        console.log(sql);	
    	
        database.query(sql, (err, results, field) => {	
            if (err) return res.status(500).send('Error Getting Reviews for Single Juice Page');	
    	
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
