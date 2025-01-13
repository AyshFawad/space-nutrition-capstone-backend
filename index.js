import "dotenv/config";
import express from "express";
const app = express();
import plantRoutes from "./routes/plantsRoute.js";
import recipesRoutes from "./routes/recipesRoute.js";

const PORT = process.env.PORT || 5051;


app.use("/api", plantRoutes, recipesRoutes);
 
app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});