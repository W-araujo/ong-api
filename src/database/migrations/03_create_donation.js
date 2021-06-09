exports.up = function (knex) {
    return knex.schema.createTable('donation', (table) => {
      table.increments('id').primary()
      table.integer('value').notNullable()
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTable('donation')
  }