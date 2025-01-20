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
    
    const { name, calories, carbohydrate , cholesterol, fat, fiber, potassium, protein, sodium, sugar } = req.body;
  
    try {
      const newData = {
        name:name,
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
  
      const insertedData = await knex('myCalories').insert(newData); 

      res.status(200).json({        
        Data: insertedData[0] 
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