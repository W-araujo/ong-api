const { development } = require('../../knexfile')
const knex = require('knex')(development)

class BaseModel {
    constructor(model) {
        this.model = model
    }

    async create (data) {
        return await knex(this.model).insert(data)
      }
    
      async list () {
        return knex(this.model).select('*').where({ is_deleted: false })
      }
      
      async get (id) {
        return knex(this.model).where({ id, is_deleted: false }).first()
      }
    
      async update (id, data) {
        return knex(this.model).where({ id }).update(data)
      }
    
      async delete (id) {
        return knex(this.model).where({ id }).update({ is_deleted: true })
      }
}

module.exports = BaseModel