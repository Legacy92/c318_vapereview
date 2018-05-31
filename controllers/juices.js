const mysql = require('mysql');
const db = require('../database');

exports.getAllJuices = async (req, res) => {
    try {
        const query = 'SELECT `j`.*, AVG(`r`.`rating`) as rating from `juices` j LEFT JOIN `reviews` r ON `j`.`id` = `r`.`juice_id` LEFT JOIN `juices-flavors` ON `juices-flavors`.`review_id` = `r`.`id` GROUP BY 1,2,3,4,5';
        const sql = mysql.format(query);

        const juices = await db.query(sql);

        const output = {
            success: true,
            data: juices
        }
        res.json(output);
    } catch(err){
        res.status(500).send('Error Getting List of All Juices');
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
    