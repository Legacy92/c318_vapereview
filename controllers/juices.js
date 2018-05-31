const mysql = require('mysql');
const db = require('../database');

exports.getAllJuices = async (req, res) => {
    try {
        const query = 'SELECT `j`.*, AVG(`r`.`rating`) as rating from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` GROUP BY 1,2,3,4,5';
        const sql = mysql.format(query);

        const juices = await db.query(sql);

        const output = {
            success: true,
            juices
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting List of All Juices');
    }
}

exports.searchJuices = async (req, res, next) => {
    try {
        const { term } = req.query;

        const query = 'SELECT `j`.*, AVG(`r`.`rating`) as rating from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` LEFT JOIN `flavors` as f ON `f`.`id` = `juices-flavors`.`flavor_id` LEFT JOIN `category` as c ON `c`.`id` = `f`.`catagory_id` WHERE `j`.`name` = ? OR `j`.`manufacturer_name` = ? OR `f`.`flavor` = ? OR `c`.`category` = ? GROUP BY 1,2,3,4,5';
        const inserts = [term, term, term, term];
        const sql = mysql.format(query, inserts);

        const juices = await db.query(sql);

        const output = {
            success: true,
            juices
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Searching For Results');
    }
}

exports.getRandomJuice = async (req, res) => {
    try {
        const query = 'SELECT * FROM `juices` ORDER BY RAND() LIMIT 1';
        const sql = mysql.format(query);

        const randomJuice = await db.query(sql);

        if (!randomJuice.length) throw new Error('No juice results');

        const output = {
            success: true,
            juice: randomJuice[0]
        }
        
        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting Random Juice');
    }
}

exports.getSingleJuice = async (req, res) => {
    try {
        const { juice_id } = req.query;

        const query = 'SELECT `juices`.*, AVG(`reviews`.`rating`) as rating FROM ?? JOIN ?? ON ?? = ?? WHERE ?? = ?';
        const inserts = ['juices', 'reviews', 'juices.id', 'reviews.juice_id', 'juices.id', juice_id];
        const sql = mysql.format(query, inserts);

        const singleJuice = await db.query(sql);

        if(!singleJuice.length) throw new Error('No juice results');

        const output = {
            success: true,
            juice: singleJuice[0]
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting Single Juice Data');
    }
}

exports.getSingleJuiceReviews = async (req, res, next) => {
    try {
        const { juice_id } = req.query;

        const query = 'SELECT `id`,`rating`, `description` as review, `juice_id`, `user_id`, `created` FROM ?? WHERE ?? = ? ORDER BY `reviews`.`created` DESC';
        const inserts = ['reviews', 'reviews.juice_id', juice_id];
        const sql = mysql.format(query, inserts);

        const reviews = await db.query(sql);

        const output = {
            success: true,
            reviews
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting Single Juice Reviews');
    }
}

exports.getFlavorChartData = async (req, res, next) => {
    try {
        let { juice_id } = req.body;
        juice_id = 1;

        const query = 'SELECT ??, ?? FROM ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? JOIN ?? on ?? = ?? WHERE ?? = 1';
        const inserts = ['category.category', 'flavors.flavor', 'reviews', 'juices-flavors', 'reviews.id', 'juices-flavors.review_id', 'flavors', 'flavors.id', 'juices-flavors.flavor_id', 'category', 'flavors.catagory_id', 'category.id', 'reviews.juice_id', juice_id];

        const sql = mysql.format(query, inserts);

        const results = await db.query(sql);

        const categoryLength = results.length;

        const categoryCounter = results.map(oldValue => {
            return oldValue.category;
        }).reduce((counters, category) => {
            console.log('previous value: ', counters, '\ncurrent value: ', category);
            if (counters.hasOwnProperty(category)) {
                counters[category] += 1 / categoryLength * 100;
            } else {
                counters[category] = 1 / categoryLength * 100;
            }
            return counters;
        }, {});

        const output = {
            success: true,
            data: categoryCounter
        }

        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting Data for Flavor Graph');
    }
}

exports.addJuice = async (req, res) => {
    try {
        const { juice_name, manufacturer_name, manufacturer_description, manufacturer_site } = req.body;

        const query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES ( ?, ?, ?, ?)';
        const inserts = ['juices', 'name', 'manufacturer_name', 'manufacturer_site', 'manufacturer_description', juice_name, manufacturer_name, manufacturer_site, manufacturer_description];
        const sql = mysql.format(query, inserts);
        
        const addResult = await db.query(sql);

        if(!addResult.affectedRows) throw new Error('Error saving to database');
        
        const output = {
            success: true,
            data: addResult
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Adding Juice');
    }
}

exports.addReview = async (req, res, next) => {
    const { rating, description, juice_id, user_id, reviewFlavors } = req.body;
    console.log(reviewFlavors);
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
        if (output.success) {
            for (let i = 0; i < reviewFlavors.length; i++) {
                let flavorId = reviewFlavors[i];
                let query = 'INSERT INTO ?? (??, ??) VALUES (?, ?)'
                let inserts = ['juices-flavors', 'review_id', 'flavor_id', reviewId, flavorId]

                let sql = mysql.format(query, inserts);
                console.log("This is the formatted SQL", sql);
                database.query(sql, (err, results, fields) => {
                    if (err) return res.status(500).send('Error Adding Review/Flavor IDs');
                    let output = {
                        success: true,
                        data: results
                    }
                });
            }
        }
    });
}

exports.getFlavorCategories = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM ??';
        const inserts = ['category'];
        const sql = mysql.format(query, inserts);

        const categories = await db.query(sql);

        const output = {
            success: true,
            categories
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting Flavor Categories');
    }
}

exports.getFlavorsByCategoryId = async (req, res, next) => {
    try {
        const { category } = req.query;

        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        const inserts = ['flavors', 'catagory_id', category];
        const sql = mysql.format(query, inserts);

        const flavors = await db.query(sql);

        const output = {
            success: true,
            flavors
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting Flavors');
    }
}
