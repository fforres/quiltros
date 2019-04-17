import knex from 'knex'

const connection = {
  database: 'myapp_test',
  host: '127.0.0.1',
  migrations: {
    tableName: 'migrations'
  },
  password: 'secretpassword',
  user: 'postgres',
}

export const pgConnection = knex({
  client: 'pg',
  connection,
  debug: true
});
