const db = require('../database');
const mysql = require('mysql');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const { jwtSecret } = require('../config');

const testUser = {
    username: 'someTestGuy',
    password: 'somethingEncrypted',
    id: 1
}

const localLogin = new LocalStrategy({}, (username, password, done) => {
    const query = 'SELECT * FROM ?? where ?? = ?';
    const inserts = ['users', 'username', username];

    const sql = mysql.format(query, inserts);

    console.log('Find User Query:', sql);

    database.query(sql, (err, results) => {
        console.log('User Find Result:', results);

        // Check password

    
        done(null, testUser);
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwtSecret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    const query = 'SELECT * FROM ?? where ?? = ?';
    const inserts = ['users', 'id', payload.uid];

    const sql = mysql.format(query, inserts);

    console.log('JWT Find User By ID:', sql);

    database.query(sql, (err, results) => {
        console.log('JWT Find User Result:', results);

        done(null, testUser);
    });
});

passport.use(localLogin);
passport.use(jwtLogin);
