const axios = require('axios');
const getAuthToken = require('./getAuthToken');
const fetchNumbers = async (type) => {
    const NUMBER_API_URLS = {
        "p": "http://20.244.56.144/evaluation-service/primes",
        "f": "http://20.244.56.144/evaluation-service/fibo",
        "e": "http://20.244.56.144/evaluation-service/even",
        "r": "http://20.244.56.144/evaluation-service/rand"
    };
    try {
        const url = NUMBER_API_URLS[type];
        if (!url) return [];

        const token = await getAuthToken();
        if (!token) return [];

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 500
        });
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching numbers: ${error.message}`);
        return [];
    }
}
module.exports = fetchNumbers;