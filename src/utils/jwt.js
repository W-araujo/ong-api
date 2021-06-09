const JWT = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY

const tokenGenerator = (ong) => {
    return JWT.sign({
        id: ong.id,
        email: ong.email,
        role: ong.role
    },
        jwtKey,
        {
            expiresIn: "1h"
        }
    )
}

const decode = (token) => {
    return JWT.verify(token, jwtKey)
}

module.exports = { tokenGenerator, decode }