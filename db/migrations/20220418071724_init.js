/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return Promise.all([
        knex.schema.createTable('users', table => {
          table.increments('id').primary();
          //table.string('email').notNullable().unique();
          table.string('username');
          table.string('password');
          table.timestamps(true, true)
        })
    ])
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    
    return Promise.all([
        knex.schema.dropTable('users')
    ])
  
};
