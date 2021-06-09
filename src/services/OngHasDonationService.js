const OngHasDonation = require('../model/OngHasDonation')


class OngHasDonationService {
    async create(data) {
        return OngHasDonation.create(data)
    }

    async list() {
        return OngHasDonation.list()
    }

    async getDonationByOngId(ong_id){
        return OngHasDonation.getDonationByOngId(ong_id)
    }

    async infoOng(ong_id){
        return OngHasDonation.infoOng(ong_id)
    }
}

module.exports = new OngHasDonationService