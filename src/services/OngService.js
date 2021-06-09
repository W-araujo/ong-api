const ONG = require('../model/ONG')

const { v4: uuidv4, validate } = require('uuid')

const { encryptPassword, comparePassword } = require('../utils/password')
const { tokenGenerator } = require('../utils/jwt')

class ONGService {
    async create(data) {
        const ong = {
            id: uuidv4(),
            name: data.name,
            description: data.description,
            type_id: data.type_id,
            highlights: data.highlights,
            phone: data.phone,
            email: data.email,
            password: encryptPassword(data.password),
            role: data.role
        }
        await ONG.create(ong)
        return ong
    }

    async findByEmail(email) {
        const ongAlreadyExists = ONG.findByEmail(email)

        if (!ongAlreadyExists) {
            throw new Error('Ong não existente!')
        }

        return ongAlreadyExists
    }

    async login(data) {
        const { password: passwordEncrypted, ...user } = await ONG.findByEmail(data.email)
        const isTrue = comparePassword(data.password, passwordEncrypted)
        if (!isTrue) {
            throw new Error('A senha nao é igual')
        }
        const token = tokenGenerator(user)
        return { token, user }
    }

    async listAll() {
        return ONG.listAll()
    }

    async get(id) {
        if (!validate(id)) {
            throw new Error('Este ID é inválido')
        }
        return ONG.get(id)
    }

    async findHighlights() {
        return ONG.findHighlights()
    }

    async updateHighlights(id) {
        let isHighlights
        const ongAlreadyExists = await ONG.get(id)

        if(!ongAlreadyExists){
            throw new Error('Ong não existente!')
        }

        if(ongAlreadyExists.highlights === 0){
            isHighlights = false
        }else {
            isHighlights = true
        }
        return ONG.uploadHighlights(id, isHighlights)
    }

    async searchOngsByName(name) {
        if (!name) {
            throw new Error('Nenhum nome informado')
        }
        return ONG.searchOngsByName(name)
    }

    async update(id, data) {
        return ONG.update(id, data)
    }

    async upload(id, avatar) {
        return ONG.upload(id, avatar)
    }

    async delete(id) {
        return ONG.delete(id)
    }
}

module.exports = new ONGService