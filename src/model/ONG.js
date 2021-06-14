const { development } = require('../../knexfile')
const knex = require('knex')(development)

const BaseModel = require('./Base')

class ONG extends BaseModel {
    constructor() {
        super('ONG')
    }

    async searchOngsByName(name) {
        return knex(`ong_has_donation as ohd`)
            .join('ong as o', 'o.id', 'ohd.ong_id')
            .join('type as t', 't.id', 'o.type_id')
            .join('donation as d', 'd.id', 'ohd.donation_id')
            .select('o.id', 'o.avatar', 'o.name', 'o.description', 'o.email', 't.name as tname', 'o.phone')
            .where('o.name', "like", `${name}%`)
            .sum({ Totalvalue: "value" })
            .min({ minDonation: "value" })
            .max({ maxDonation: "value" })
            .avg({ averageDonation: "value" })
            .count('* as Totaldonations')
            .orderBy('name', 'asc')
    }


    async findHighlights() {
        return knex(`ONG as o`)
            .join('type as t', 't.id', 'o.type_id')
            .select('o.id', 'o.avatar', 'o.name', 'o.description', 'o.email', 't.name as type', 'o.phone')
            .where({ highlights: true })
            .orderBy('o.name', 'asc')
    }

    async upload(id, avatar) {
        return knex(this.model).where({ id }).update({ avatar })
    }

    async uploadHighlights(id, isHighlights) {
        if (isHighlights) {
            return knex(this.model).where({ id }).update({ highlights: false })
        } else {
            return knex(this.model).where({ id }).update({ highlights: true })
        }

    }

    async listAll() {
        return knex(`${this.model} as o`)
            .join('type as t', 't.id', 'o.type_id')
            .select('o.id', 'o.avatar', 'o.name', 'o.description', 'o.email', 'o.highlights', 't.name as tname', 'o.phone')
            .where({ is_deleted: false })
            .orderBy('name', 'asc')
    }

    async findByEmail(email) {
        return knex(`${this.model} as o`)
            .where('email', email)
            .andWhere({ is_deleted: false })
            .select('o.email', 'o.password', 'o.id', 'o.name', 'o.role')
            .first()
    }

}

module.exports = new ONG