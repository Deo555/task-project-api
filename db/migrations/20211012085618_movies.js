//creating table 
exports.up = function(knex, Promise) {
    return knex.schema.createTable('movies', (table) => {
       table.increments(); //id
       table.string('title').notNullable().unique(); //unique ocito
       table.string('genre').notNullable(); //znaci da mora postojati
       table.integer('rating').notNullable();
       table.boolean('explicit').notNullable();
   });
  };
  
  //reverts up fucntion
  exports.down = function(knex, Promise) {
        return knex.schema.dropTable('movies');
  };
  