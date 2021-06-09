const { development } = require('../../knexfile')
const knex = require('knex')(development)

const BaseModel = require('./Base')

class OngHasDonation extends BaseModel {
    constructor() {
        super('ong_has_donation')
    }

    async getDonationByOngId(ong_id) {
        return knex(`${this.model} as ohd`)
            .join('ong as o', 'o.id', 'ohd.ong_id')
            .select('o.name')
            .join('donation as d', 'd.id', 'ohd.donation_id')
            .select('d.value')
            .where({ ong_id })
    }

    async infoOng(ong_id) {
        const info = knex(`${this.model} as ohd`)
            .join('ong as o', 'o.id', 'ohd.ong_id')
            .join('donation as d', 'd.id', 'ohd.donation_id')
            .where({ ong_id })
            .sum({ Totalvalue: "value" })
            .min({ minDonation: "value" })
            .max({ maxDonation: "value" })
            .avg({ averageDonation: "value" })
            .count('* as Totaldonations')

        return info
    }

}

module.exports = new OngHasDonation