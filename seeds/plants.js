import plantData from "../seed-data/plant.js";


export async function seed(knex) {
  await knex("plant").del();
  await knex("plant").insert(plantData);
 }