const { signIn, signUp } = require('../controllers/authentication');
const passport = require('passport');

require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
    app.post('/auth/sign-in',requireSignIn, signIn);
    
    app.post('/auth/sign-up', signUp);

    app.post('/auth/test', requireAuth, (req, res) => {
        res.send({success: true});
    });
}

