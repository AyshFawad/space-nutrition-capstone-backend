import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/myplants", async (_req, res) => {
    try {
        const data = await knex("myPlants");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving plants: ${err}`);
    }
});
router.post('/myPlants', async (req, res) => {
    // Destructure the incoming data from the request body
    const { id, name, watering_frequency, temperature_range, humidity_level, photo, growth_stage } = req.body;
  
    // Validate the incoming data
    if ( !name || !watering_frequency || !temperature_range || !humidity_level || !photo || !growth_stage) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Insert new crop data into the database
    try {
      const newCropData = {
        name: name,
        watering_frequency: watering_frequency,
        temperature_range: temperature_range,
        humidity_level: humidity_level,
        photo: photo,
        growth_stage: growth_stage,
        
      };
  
      // Insert crop data into the "crops" table
      const insertedCrop = await knex('myPlants').insert(newCropData); // Insert and return the inserted record
  
      // Send response with the inserted crop data
      res.status(200).json({        
        crop: insertedCrop[0] // Return the first inserted crop data
      });
    } catch (error) {
      console.error('Error inserting crop data:', error);
      res.status(500).json({ error: 'Failed to add crop data' });
    }
  });

// router.get("/plants/:id", async (req, res) => {
//     try {
//       const plant = await knex("plant")
//         .where({ id: req.params.id })
//         .first();
//       if (!plant) {
//         return res.status(404).send({
//           message: `There is no plant with id: ${req.params.id}`,
//         });
//       }
//       res.json(plant);
//     } catch (e) {
//       res.status(500).json({
//         message: `Error getting plant ${req.params.id}`,
//       });
//     }
//   });

export default router;