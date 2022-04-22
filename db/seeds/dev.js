/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
   // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "users" CASCADE');



  //insert seed data
  await knex('user').insert([
    {
      id: 1,
      username: 'sid',
      password: 'user@1',
     
    },
    {
      id: 2,
      username: 'Raj',
      password: 'user@2',
      
    },
    {
      id: 3,
      username: 'Joy',
      password: 'user@3',
    },
    {
      id: 4,
      username: 'suraj',
      password: 'user@4',
    },
  ]);

};
