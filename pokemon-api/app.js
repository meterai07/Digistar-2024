const express = require('express');
const pokemonRoutes = require('./src/routes/pokemonRoutes');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use('/api', pokemonRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});