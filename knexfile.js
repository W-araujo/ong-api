require('dotenv').config()
const { DB_CLIENT, DB_HOST, DB_NAME, DB_PASS, DB_USER } = process.env

module.exports = {

  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations'
    },
    seeds: {
      directory: 'src/database/seeds',
    },
  },
  
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/dev.sqlite'
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  },

};
