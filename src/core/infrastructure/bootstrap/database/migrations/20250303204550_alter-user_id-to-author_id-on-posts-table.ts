import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (table) => {
    table.renameColumn('user_id', 'author_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('posts', (table) => {
    table.renameColumn('author_id', 'user_id');
  });
}
