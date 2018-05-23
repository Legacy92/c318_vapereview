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

// //Get Data by Flavor ID
// app.get("/api/multiple-results", (req, res, next) => {
//     let { flavor } = req.body;
//     flavor = 1;

//     let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
//     let inserts = ['juices-flavors', 'reviews', 'juices-flavors.review_id', 'reviews.id', 'juices', 'reviews.juice_id', 'juices.id', 'juices-flavors.flavor_id', flavor];

//     let sql = mysql.format(query, inserts);

//     console.log(sql);

//     database.query(sql, (err, results, field) => {
//         if (err) return next(err);

//         const output = {
//             success: true,
//             data: results
//         }
//         res.json(output);
//     });
// });

// Get Data by Flavor Name
// app.get("/api/multiple-results", (req, res, next) => {
//     let { flavor } = req.body;

//     let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
//     let inserts = ['`flavors`', 'juices-flavors` b', '`b`.`flavor_id`', '`f`.`id`', '`reviews` r', '`r`.`id`', '`b`.`review_id`', '`juices` j', '`j`.`id`', '`r`.`juice_id`', ' `f`.`flavor`', flavor];

//     let sql = mysql.format(query, inserts);

//     console.log(sql);

//     database.query(sql, (err, results, field) => {
//         if (err) return next(err);

//         const output = {
//             success: true,
//             data: results
//         }
//         res.json(output);
//     });
// });

// Browse 
app.get("/api/multiple-results-browse", (req, res, next) => {
    let query = 'SELECT * FROM `juices` LEFT JOIN `reviews` ON `juices`.`id` = `reviews`.`juice_id`';
    // let inserts = ['`juices`', 'juices-flavors` b', '`b`.`flavor_id`', '`f`.`id`', '`reviews` r', '`r`.`id`', '`b`.`review_id`', '`juices` j', '`j`.`id`', '`r`.`juice_id`', ' `f`.`flavor`', flavor];

    let sql = mysql.format(query);

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

//search by all 
app.get("/api/multiple-results", (req, res, next) => {
    let { input } = req.query;


    let query = 'SELECT `j`.*, `r`.`rating`,`r`.`id` AS review_id, `c`.`category`, `f`.`flavor` from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` LEFT JOIN `flavors` as f ON `f`.`id` = `juices-flavors`.`flavor_id` LEFT JOIN `category` as c ON `c`.`id` = `f`.`catagory_id` WHERE `j`.`name` = ? OR `j`.`manufacturer_name` = ? OR `f`.`flavor` = ? OR `c`.`category` = ?';
    let inserts = [input, input, input, input] ;

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

//Get Single Juice Results
app.get("/api/single-results", (req, res, next) => {
    let { singleJuice } = req.body;
    singleJuice = 3;

    let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
    let inserts = ['juices', 'reviews', 'juices.id', 'reviews.juice_id', 'juices.id', singleJuice];

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

//Get Flavors for Chart by juice_id
app.get("/api/single-results", (req, res, next) => {
    let { flavors } = req.body;
    flavors = 3;
    // SELECT * from `reviews` JOIN `juices-flavors` ON `juices-flavors`.`reviews_id` = `reviews`.`juice_id` WHERE `reviews`.`juice_id` = 3
    let query = 'SELECT * FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
    let inserts = ['juices', 'reviews', 'juices.id', 'reviews.juice_id', 'juices.id', flavors];

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


// create user -- use product or review instead of add-review because POST methods imply addition or creation 
app.post("/api/create-user", (req, res, next) => {
    const { username, password } = req.body;

    let query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
    let inserts = ['users', 'username', 'password', 'email', 'created', 'role', username, password, 'NULL', 'CURRENT_TIMESTAMP', '1'];

    let sql = mysql.format(query, inserts);
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

    let query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES ( ?, ?, ?, ?)';
    let inserts = ['juices', 'name', 'manufacturer_name', 'manufacturer_site', 'manufacturer_description', name, manufacturer, site, description ];

    let sql = mysql.format(query, inserts);
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

//add review

app.post('/api/add-review', (req, res, next) => {
    const { rating, description, juice_id, user_id, flavor } = req.body;

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
            let query = 'SELECT * FROM ?? WHERE ?? = ?'
            let inserts = ['flavors', 'flavors.flavor', flavor]

            let sql = mysql.format(query, inserts);
            console.log("This is the formatted SQL", sql);
            database.query(sql, (err, results, fields) => {
                if (err) return next(err);
                let output = {
                    success: true,
                    data: results
                }
                const flavorId = output.data[0].id
                console.log('output', flavorId)

                if (output.success) {
                    let query = 'INSERT INTO ?? (??, ??) VALUES (?, ?)'
                    let inserts = ['juices-flavors', 'review_id', 'flavor_id', reviewId, flavorId]
        
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
