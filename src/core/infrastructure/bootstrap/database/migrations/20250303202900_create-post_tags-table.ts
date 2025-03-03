import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_tags', (table) => {
    table.increments('id').primary();
    table
      .integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts');
    table
      .integer('tag_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tags');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post_tags');
}
