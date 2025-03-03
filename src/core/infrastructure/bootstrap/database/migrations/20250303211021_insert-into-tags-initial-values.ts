import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex('tags').insert([
    {
      name: 'javascript',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'typescript',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'node.js',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'backend',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'frontend',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'architecture',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  return knex('tags').del();
}
