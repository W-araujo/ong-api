const md5 = require("md5")

const encryptPassword = (password) => {
    return md5(password)
}

const comparePassword = (password, encryptedPassword) => {
    if (encryptPassword(password) === encryptedPassword) {
        return true
    }
    return false
}

module.exports = { encryptPassword, comparePassword }