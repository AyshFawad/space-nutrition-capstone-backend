/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("plant", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer("growth_stage").notNullable();
        table.string("watering_frequency").nullable();
        table.string("temperature_range").nullable();
        table.string("humidity_level").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("plant");
  }
  
