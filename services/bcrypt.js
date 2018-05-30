const bcrypt = require('bcrypt-nodejs');
const util = require('util');

bcrypt.genSalt = util.promisify(bcrypt.genSalt);
bcrypt.hash = util.promisify(bcrypt.hash);
bcrypt.compare = util.promisify(bcrypt.compare);

module.exports = bcrypt;
