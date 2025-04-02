const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const numberWindow = [];

const AUTH_HEADER = { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNTk5NDUwLCJpYXQiOjE3NDM1OTkxNTAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY2Y2FlZDIzLTEyOGEtNGFmOS04OWQ4LTViOWEwOGExNzZlYiIsInN1YiI6IjIyMDUyOTU2QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1Mjk1NkBraWl0LmFjLmluIiwibmFtZSI6ImFhc3RoYSBrdW1hcmkiLCJyb2xsTm8iOiIyMjA1Mjk1NiIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6IjY2Y2FlZDIzLTEyOGEtNGFmOS04OWQ4LTViOWEwOGExNzZlYiIsImNsaWVudFNlY3JldCI6Im1Dbmt3aGdYUmRmRXZOZWcifQ.7GM5U9EtIMbdHmY6LkxHHKjOVLtuXBZAtxBAv8kxcds" };

const NUMBER_API_URLS = {
    "p": "http://20.244.56.144/evaluation-service/primes",
    "f": "http://20.244.56.144/evaluation-service/fibo",
    "e": "http://20.244.56.144/evaluation-service/even",
    "r": "http://20.244.56.144/evaluation-service/rand"
};

async function fetchNumbers(type) {
    const url = NUMBER_API_URLS[type];
    if (!url) {
        throw new Error("Invalid number type");
    }
    try {
        const response = await axios.get(url, { headers: AUTH_HEADER, timeout: 500 });
        console.log(`Response from ${url}:`, response.data);
        return response.data.numbers || [];
    } catch (error) {
        return [];
    }
}

app.get('/numbers/:numberType', async (req, res) => {
    const numberType = req.params.numberType;
    const prevState = [...numberWindow];
    const newNumbers = await fetchNumbers(numberType);
    console.log(`Fetched numbers: ${newNumbers}`);
    newNumbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            if (numberWindow.length >= WINDOW_SIZE) {
                numberWindow.shift();
            }
            numberWindow.push(num);
        }
    });
    
    const currState = [...numberWindow];
    const avg = currState.length > 0 ? (currState.reduce((a, b) => a + b, 0) / currState.length).toFixed(2) : 0.00;
    
    res.json({
        windowPrevState: prevState,
        windowCurrState: currState,
        numbers: newNumbers,
        avg: parseFloat(avg)
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});