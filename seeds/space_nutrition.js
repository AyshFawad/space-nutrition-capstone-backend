import plantData from "../seed-data/plant.js";
import recipesData from "../seed-data/space_food_recipes.js"


export async function seed(knex) {
  await knex("plant").del();
  await knex("space_food_recipes");
  await knex("plant").insert(plantData);
  await knex("space_food_recipes").insert(recipesData);

 }