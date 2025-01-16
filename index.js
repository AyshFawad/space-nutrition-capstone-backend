import "dotenv/config";
import cors from 'cors';
import express from "express";
import plantRoutes from "./routes/plantsRoute.js";
import recipesRoutes from "./routes/recipesRoute.js";
import myPlantsRoute from "./routes/myPlantsRoute.js"
import CaloriesRoute from "./routes/CaloriesRoute.js";

const app = express();
const PORT = process.env.PORT || 5051;
app.use(cors());
app.use(express.static('public'));
app.use(express.json());


app.use("/api", plantRoutes, recipesRoutes, myPlantsRoute,CaloriesRoute );
 
app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});