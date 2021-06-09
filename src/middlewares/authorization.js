const { decode } = require('../utils/jwt')

const authorization = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            throw new Error('Token nao encontrado!')
        }
        const [, token] = authHeader.split(' ');

        const decoded = decode(token)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Invalid token" })
    }
}

module.exports = { authorization }