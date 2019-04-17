const { NODE_ENV } = process.env

exports.up = async (knex, Promise) => {
  NODE_ENV && await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await knex.schema.createTable('users', table => {
    NODE_ENV ? table.uuid('hash').primary().defaultTo(knex.raw('uuid_generate_v4()')) : table.uuid('hash').primary()
    table.string('first_name');
    table.string('last_name');
  })
};

exports.down = async (knex, Promise) => {
  NODE_ENV && await knex.raw('drop extension if exists "uuid-ossp"')
  await knex.schema.dropTable('users')
};
