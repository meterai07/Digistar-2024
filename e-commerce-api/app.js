require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/router');
const { connectDB, seedRoles, seedItems, seedOrders, seedAdmin } = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();
// uncomment the following lines to seed the database
// seedRoles();
// seedItems();
// seedOrders();
// seedAdmin();

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server successfully running on port ${PORT}`);
});