import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_comments', (table) => {
    table.increments('id').primary();
    table
      .integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts');
    table
      .integer('author_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    table.text('content').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post_comments');
}
