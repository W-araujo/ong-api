const OngHasDonationService = require('../services/OngHasDonationService')

class OngHasDonationController {

    async create(req, res) {
        try {
            await OngHasDonationService.create(req.body)
            return res.status(201).json('Doação efetuada com sucesso!')
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na doação :(')
        }
    }

    async list(req, res) {
        try {
            const donation = await OngHasDonationService.list()
            return res.status(200).json(donation)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na listagem :(')
        }
    }

    async getDonationByOngId(req, res){
        try {
            const ong = await OngHasDonationService.getDonationByOngId(req.params.ong_id)
            return res.status(200).json(ong)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na busca da ong :(')
        }
    }

    async infoOng(req, res){
        try {
            const totalOngvalue = await OngHasDonationService.infoOng(req.params.ong_id)
            return res.status(200).json(totalOngvalue)
        } catch (error) {
            console.log(error)
            return res.status(400).json('Erro na soma das doações da ong :(')
        }
    }

}

module.exports = OngHasDonationController