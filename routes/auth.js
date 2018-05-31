const { signIn, signUp } = require('../controllers/authentication');
const { requireAuth, requireSignIn } = require('../services/passport');

module.exports = app => {
    app.post('/auth/sign-in',requireSignIn, signIn);
    
    app.post('/auth/sign-up', signUp);

    app.post('/auth/test', requireAuth, (req, res) => {
        res.send({success: true});
    });
}

