/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("plant", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("watering_frequency").nullable();
        table.string("temperature_range").nullable();
        table.string("humidity_level").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable('ingredients', (table) => {
        table.increments('id').primary(); 
        table.string('name').notNullable(); 
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable('space_food_recipes', (table) => {
        table.increments('id').primary(); 
        table.string('name').notNullable(); 
        table.text('instructions').notNullable(); 
        table.string('meal_type').nullable(); 
        table.string('dietary_restrictions').nullable(); 
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
      })
      .createTable('recipe_ingredients', (table) => {
        table.increments('id').primary(); 
        table
          .integer('recipe_id')
          .unsigned()
          .references('id')
          .inTable('space_food_recipes')
          .onDelete('CASCADE'); 
        table
          .integer('ingredient_id')
          .unsigned()
          .references('id')
          .inTable('ingredients')
          .onDelete('CASCADE');
        table.integer('quantity').nullable(); 
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
      });
  };
      
      
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  export function down(knex) {
    return knex.schema
      .dropTableIfExists('recipe_ingredients')  
      .dropTableIfExists('ingredients')  
      .dropTableIfExists('space_food_recipes')
      .dropTableIfExists('plant'); 
  } 
    
    
    

