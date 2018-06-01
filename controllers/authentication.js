const mysql = require('mysql');
const jwt = require('jwt-simple');
const uuid = require('uuid/v1');
const db = require('../database');
const { genSalt, hash } = require('../services/bcrypt');
const { jwtSecret } = require('../config');

function tokenForUser(user){
    const now = new Date().getTime();

    return jwt.encode({
        uid: user.id,
        ts: now
    }, jwtSecret);
}

exports.signUp = async (req, res) => {

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

    try{
        username = username.toLowerCase();
        email = email.toLowerCase();

        const query = 'SELECT ??, ?? FROM ?? WHERE ?? = ? OR ?? = ?';
        const inserts = ['username', 'email', 'users', 'username', username, 'email', email];
        const sql = mysql.format(query, inserts);

        const results = await db.query(sql);

        if (results.length) {
            const errors = results.map(user => {
                if (user.username === username) {
                    return 'Username in use';
                } else if (user.email = email) {
                    return 'Email in use';
                }
            });

            return res.status(422).send(errors);
        }

        try {
            const passwordHash = await encryptPassword(password);

            const addQuery = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
            const addInserts = ['users', 'id', 'username', 'password', 'email', 'role', uuid(), username, passwordHash, email, '1'];
            const addSql = mysql.format(addQuery, addInserts);

            const saveResult = await db.query(addSql);

            if(!saveResult.affectedRows) throw new Error('Error saving new user to database');

            res.send({
                success: true,
                token: tokenForUser({id: saveResult.insertId}),
                username
            });
        } catch(err){
            res.status(500).send(['Error creating account']);
        }
    } catch(err){
        res.status(500).send(['Error creating account']);
    }
}

exports.signIn = async (req, res) => {
    res.send({
        success: true,
        token: tokenForUser(req.user),
        username: req.user.username
    });
}

async function encryptPassword(password){
    try {
        const salt = await genSalt(10);
        const passwordHash = await hash(password, salt, null);

        return passwordHash;
    } catch(err){
        throw new error(`ERROR Encrypting password: ${err.message}`);
    }
}
