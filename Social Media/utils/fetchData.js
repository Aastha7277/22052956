const getAuthToken = require("./getAuthToken");
const axios = require("axios"); 

const fetchData = async (url) => {
    try {
        const token = await getAuthToken();
        console.log("token",token)
        if (!token) throw new Error("Authentication failed");
        
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 500,
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.data || error.message);
        return null;
    }
};

module.exports = fetchData;