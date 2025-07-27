const crypto = require('crypto')


class bryct {
    hashPassword (Password){
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.scryptSync(Password , salt , 64).toString('hex');
        return {salt , hash};
    }

    verifyPassword(userPassword , salt ,hash){
        const verify = crypto.scryptSync(userPassword , salt , 64).toString('hex');
        return verify == hash
    }
}

module.exports = bryct;