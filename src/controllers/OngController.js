const OngService = require('../services/OngService')

class ONGController {

    async create(req, res) {
        try {
            const ong = await OngService.create(req.body)
            return res.status(201).json(ong)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Falha na criação da ONG :(')
        }
    }

    async listAll(req, res) {
        try {
            const ONGs = await OngService.listAll()
            return res.status(200).json(ONGs)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na listagem :(')
        }
    }

    async get(req, res) {
        try {
            const ONG = await OngService.get(req.params.id)
            return res.status(200).json(ONG)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na busca da ong :(')
        }
    }

    async findHighlights(req, res) {
        try {
            const highlights = await OngService.findHighlights()
            return res.status(200).json(highlights)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na busca da ong :(')
        }
    }

    async updateHighlights(req, res) {
        try {
            await OngService.updateHighlights(req.params.id)
            return res.status(200).json('highlights alterado com sucesso')
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na busca da ong :(')
        }
    }

    async login(req, res){
        try {
            const user = await OngService.login(req.body)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(401).json('Falha na autenticação :(')
        }
    }

    async searchOngsByName(req, res) {
        try {
            const ONGs = await OngService.searchOngsByName(req.query.name)
            return res.status(200).json(ONGs)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na busca por tipo :(')
        }
    }

    async update(req, res) {
        try {
            await OngService.update(req.params.id, req.body)
            return res.status(200).json('ONG atualizada com sucesso!')
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na atualização da ong :(')
        }
    }

    async upload(req, res) {
        try {
            await OngService.upload(req.params.id, req.file.filename)
            return res.status(200).json(req.file)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na atualização do avatar :(')
        }
    }

    async delete(req, res) {
        try {
            await OngService.delete(req.params.id)
            return res.status(200).json('ONG excluida com sucesso!')
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na exclusão da ong :(')
        }
    }
}

module.exports = ONGController