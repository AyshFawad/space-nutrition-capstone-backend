import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/recipes", async (_req, res) => {
    try {
        const data = await knex("space_food_recipes");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving plant: ${err}`);
    }
});
router.get("/recipes/:id", async (req, res) => {
    try {
      const recipeWithIngredients = await knex("space_food_recipes")
        .where({'space_food_recipes.id': req.params.id })
        .join('recipe_ingredients', 'space_food_recipes.id', '=', 'recipe_ingredients.recipe_id')
        .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id') 
        .select(
            "space_food_recipes.id as recipe_id",
            "space_food_recipes.name", 
            "space_food_recipes.instructions",
            "space_food_recipes.meal_type",
            "space_food_recipes.dietary_restrictions",
            "ingredients.id as ingredient_id",
            "ingredients.name as ingredient_name", 
            "recipe_ingredients.quantity"
          )

      if (recipeWithIngredients.length === 0) {
        return res.status(404).send({
          message: `There is no recipe with id: ${req.params.id}`,
        });
      }
      const recipe = {
        id: recipeWithIngredients[0].recipe_id,
        name: recipeWithIngredients[0].name,
        instructions: recipeWithIngredients[0].instructions,
        meal_type: recipeWithIngredients[0].meal_type,
        dietary_restrictions: recipeWithIngredients[0].dietary_restrictions,
        ingredients: recipeWithIngredients.map(item => ({
        ingredient_id: item.ingredient_id,
        ingredient_name: item.ingredient_name,  
        quantity: item.quantity
        })),
      };
      res.json(recipe);
    } catch (e) {
      res.status(500).json({
        message: `Error getting recipe ${req.params.id}`,
      });
    }
  });

export default router;