import plantData from "../seed-data/plant.js";
import recipesData from "../seed-data/space_food_recipes.js"
import ingredientsData from "../seed-data/ingredients.js"
import ingredientRecipeData from "../seed-data/recipe_ingredients.js"

export async function seed(knex) {
  await knex("plant").del();
  await knex("space_food_recipes");
  await knex("ingredients").del();
  await knex("recipe_ingredients").del();
  await knex("plant").insert(plantData);
  await knex("space_food_recipes").insert(recipesData);
  await knex("ingredients").insert(ingredientsData);
  await knex("recipe_ingredients").insert(ingredientRecipeData);

 }
