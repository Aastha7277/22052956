const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const numberWindow = [];

const NUMBER_API_URLS = {
    "p": "http://20.244.56.144/evaluation-service/primes",
    "f": "http://20.244.56.144/evaluation-service/fibo",
    "e": "http://20.244.56.144/evaluation-service/even",
    "r": "http://20.244.56.144/evaluation-service/rand"
};



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});