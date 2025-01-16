import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/mycalories", async (_req, res) => {
    try {
        const data = await knex("myCalories");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving calories: ${err}`);
    }
});
router.post('/mycalories', async (req, res) => {
    // Destructure the incoming data from the request body
    const { id, calories, carbohydrate , cholesterol, fat, fiber, potassium, protein, sodium, sugar } = req.body;
  
    // Validate the incoming data
    if ( !calories || !carbohydrate || !cholesterol || !fat || !fiber || !potassium || !protein || !sodium || !sugar) {
      return res.status(400).json({ error: 'All  fields are required' });
    }
  
    // Insert new crop data into the database
    try {
      const newData = {
        calories:calories,
        carbohydrate:carbohydrate,
        cholesterol: cholesterol,
        fat : fat,
        fiber:fiber,
        potassium:potassium,
        protein:protein,
        sodium:sodium,
        sugar:sugar        
      };
  
      // Insert crop data into the "crops" table
      const insertedData = await knex('myCalories').insert(newData); // Insert and return the inserted record
  
      // Send response with the inserted crop data
      res.status(200).json({        
        Data: insertedData[0] // Return the first inserted crop data
      });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Failed to add data' });
    }
  });
  router.delete("/mycalories/:id", async (req, res) => {
    try {
      const myCalories = await knex("myCalories")
        .where({ id: req.params.id })
        .first();
      if (!myCalories) {
        return res.status(404).send({
          message: `There is data with id: ${req.params.id}`,
        });
      }
      await knex("myCalories").where({ id: req.params.id }).del();
      res.status(200).json();
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  });



export default router;