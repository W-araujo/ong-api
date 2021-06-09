exports.up = function (knex) {
  return knex.schema.createTable('ong_has_donation', (table) => {
    table.increments('id').primary()
    table.string('ong_id').notNullable()
    table.integer('donation_id').notNullable().unsigned()

    table.foreign('ong_id').references('id').inTable('ONG')
    table.foreign('donation_id').references('id').inTable('donation')

    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.boolean('is_deleted').default(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('ong_has_donation')
}
