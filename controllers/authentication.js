const db = require('../database');
const mysql = require('mysql');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const { jwtSecret } = require('../config');

function tokenForUser(user){
    const now = new Date().getTime();

    return jwt.encode({
        uid: user.id,
        ts: now
    }, jwtSecret);
}

const testUser = {
    username: 'someTestGuy',
    password: 'somethingEncrypted',
    id: 1
}

exports.signUp = (req, res) => {

    let { username, email, password } = req.body;
    const errors = [];

    if(!username){
        errors.push('Missing username');
    }
    if(!email){
        errors.push('Missing email');
    }
    if(!password){
        errors.push('Missing password');
    }

    if(errors.length) return res.status(422).send(errors);

    username = username.toLowerCase();
    email = email.toLowerCase();

    const query = 'SELECT ??, ?? FROM ?? WHERE ?? = ? OR ?? = ?';
    const inserts = ['username', 'email', 'users', 'username', username, 'email', email];
    const sql = mysql.format(query, inserts);

    db.query(sql, async (err, results) => {

        if(results.length) {
            const errors = results.map( user => {
                if(user.username ===  username){
                    return 'Username in use';
                } else if(user.email = email) {
                    return 'Email in use';
                }
            });

            return res.status(422).send(errors);
        }

        const hash = await encryptPassword(password);

        const addQuery = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
        const addInserts = ['users', 'username', 'password', 'email', 'role', username, hash, email, '1'];
        const addSql = mysql.format(addQuery, addInserts);

        db.query(addSql, (err, result) => {
            if(err){
                console.log('Add User Error:', err.message);
            }
            
            console.log('Add User Result:', result.affectedRows);

            res.send({success: true});
            
            // res.send({
            //     token: tokenForUser(testUser)
            // });
        });
    });
}

exports.signIn = (req, res) => {
    res.send({
        token: tokenForUser(req.user)
    });
}

function encryptPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return reject(err.message);

            bcrypt.hash(password, salt, null, (err, hash) => {
                if(err) return reject(err.message);

                resolve(hash);
            });
        });
    });
}
