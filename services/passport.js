const db = require('../database');
const mysql = require('mysql');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('./bcrypt');
const { jwtSecret } = require('../config');

const testUser = {
    username: 'someTestGuy',
    password: 'somethingEncrypted',
    id: 1
}

const localOptions = {
    usernameField: 'email'
}
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const query = 'SELECT * FROM ?? where ?? = ?';
        const inserts = ['users', 'email', email];
        const sql = mysql.format(query, inserts);

        const users = await db.query(sql)

        if(!users.length) return done(null, false);

        const user = users[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) return done(null, false);

        done(null, user);
    } catch(err){
        console.log('ERROR Local Sign In:', err.message);
        done(err);
    }
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwtSecret
}

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const query = 'SELECT * FROM ?? where ?? = ?';
        const inserts = ['users', 'id', payload.uid];
        const sql = mysql.format(query, inserts);

        const users = await db.query(sql);

        if(!users.length) return done(null, false);

        done(null, users[0]);
    } catch(err){
        console.log('ERROR With JWT Sign In:', error.message);
        done(err);
    }
});

passport.use(localLogin);
passport.use(jwtLogin);
