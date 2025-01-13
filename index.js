import "dotenv/config";
import express from "express";
const app = express();

const PORT = process.env.PORT || 5051;

import plantRoutes from "./routes/plantsRoute.js";

// all users routes
app.use("/plant", plantRoutes);

app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});