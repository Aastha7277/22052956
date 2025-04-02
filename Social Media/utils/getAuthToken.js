const axios = require('axios');
const getAuthToken = async () => {
    const AUTH_CREDENTIALS = {
        email: process.env.EMAIL,
        name: process.env.NAME,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    };
    try {
        const response = await axios.post("http://20.244.56.144/evaluation-service/auth", AUTH_CREDENTIALS, {
            headers: { "Content-Type": "application/json" },
            timeout: 500
        });
        console.log("access token",response.data.access_token)
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching auth token:", error.message);
        return null;
    }
}

module.exports = getAuthToken;