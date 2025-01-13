import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/plants", async (_req, res) => {
	try {
		const data = await knex("plant");
		res.status(200).json(data);
	} catch (err) {
		res.status(400).send(`Error retrieving plant: ${err}`);
	}
});
router.get("/plants/:id", async (req, res) => {
    try {
      const plant = await knex("plant")
        .where({ id: req.params.id })
        .first();
      if (!plant) {
        return res.status(404).send({
          message: `There is no plant with id: ${req.params.id}`,
        });
      }
      res.json(plant);
    } catch (e) {
      res.status(500).json({
        message: `Error getting plant ${req.params.id}`,
      });
    }
  });

export default router;