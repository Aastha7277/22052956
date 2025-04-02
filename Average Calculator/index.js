const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { averageCalculator } = require('./controllers/averageCalculator');

dotenv.config();

const app = express();
const PORT = 9876;

app.get('/numbers/:numberType', averageCalculator);

app.listen(PORT, () => {
    try {
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
    }
});
