exports.up = function (knex) {
    return knex.schema.createTable('ONG', (table) => {
      table.string('id').primary()
      table.string('name', 100).notNullable()
      table.string('description', 255)

      table.integer('type_id').notNullable().unsigned()
      table.foreign('type_id').references('id').inTable('type')
      
      table.boolean('highlights').notNullable()
      table.integer('phone').notNullable()
      table.string('email', 150).notNullable()
      table.string('password', 150).notNullable()
      table.enum('role', ['client', 'user']).notNullable();
      table.string('avatar').default(null)
      table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      table.boolean('is_deleted').default(false)
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTable('ONG')
  }