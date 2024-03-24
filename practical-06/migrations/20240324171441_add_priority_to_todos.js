/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.alterTable('todos', (table) => {
    table
      .enu('priority', ['low', 'normal', 'high'])
      .notNullable()
      .defaultTo('normal');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.alterTable('todos', (table) => {
    table.dropColumn('priority');
  });
};
