exports.up = async (knex, Promise) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await knex.schema.createTable('users', table => {
    table.string('hash').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('first_name');
    table.string('last_name');
  })
};

exports.down = async (knex, Promise) => {
  await knex.raw('drop extension if exists "uuid-ossp"')
  await table.dropColumn('users')
};
