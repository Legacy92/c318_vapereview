const {
    getAllJuices,
    getRandomJuice,
    getSingleJuice,
    getSingleJuiceReviews
} = require('../controllers/juices');

module.exports = app => {
    // Browse button on landing page - returns all juices
    app.get("/api/multiple-results-browse", getAllJuices);

    // Random juice button on landing page - gets single random juice 
    app.get("/api/random-juice", getRandomJuice);

    //  Landing page search by query - allows for search by juice name, manufactuer name, flavor name or flavor category 
    app.get("/api/multiple-results", (req, res, next) => {
        const { input } = req.query;

        const query = 'SELECT `j`.*, AVG(`r`.`rating`) as rating from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` LEFT JOIN `flavors` as f ON `f`.`id` = `juices-flavors`.`flavor_id` LEFT JOIN `category` as c ON `c`.`id` = `f`.`catagory_id` WHERE `j`.`name` = ? OR `j`.`manufacturer_name` = ? OR `f`.`flavor` = ? OR `c`.`category` = ? GROUP BY 1,2,3,4,5';
        const inserts = [input, input, input, input];

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
    app.get("/api/single-juice-info", getSingleJuice);

    //Get All Reviews for Single Juice
    app.get("/api/single-juice-reviews", getSingleJuiceReviews);

    // Flavor chart on single results page - gets flavor breakdown of each juice
    app.get("/api/flavor-chart", (req, res, next) => {
        let { juice_id } = req.body;
        juice_id = 1;

        const query = 'SELECT ??, ?? FROM ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? JOIN ?? on ?? = ?? WHERE ?? = 1';
        const inserts = ['category.category', 'flavors.flavor', 'reviews', 'juices-flavors', 'reviews.id', 'juices-flavors.review_id', 'flavors', 'flavors.id', 'juices-flavors.flavor_id', 'category', 'flavors.catagory_id', 'category.id', 'reviews.juice_id', juice_id];

        const sql = mysql.format(query, inserts);

        console.log(sql);

        database.query(sql, (err, results, field) => {
            if (err) return res.status(500).send('Error Getting Data for Flavor Graph');

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
        });
    });

    //add product
    app.post('/api/add-product', (req, res, next) => {
        const { juice_name, manufacturer_name, manufacturer_description, manufacturer_site } = req.body;

        const query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES ( ?, ?, ?, ?)';
        const inserts = ['juices', 'name', 'manufacturer_name', 'manufacturer_site', 'manufacturer_description', juice_name, manufacturer_name, manufacturer_site, manufacturer_description];

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
}
