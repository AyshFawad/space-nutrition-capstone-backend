import express from 'express';
const app = express();
import "dotenv/config";

const PORT = process.env.PORT || 5051;

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to my Express App</h1>`);
});

app.listen(PORT, () => {
   console.log(`app running on port ${PORT}`)
});