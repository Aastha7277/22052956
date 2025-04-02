const axios = require("axios");
const cache = require("./cache");
const getAuthToken = require("./getAuthToken");
const getLatestPosts = async () => {
    console.log("Fetching latest posts...");
    const cachedData = cache.get("latest_posts");
    if (cachedData) return cachedData;

    const token = await getAuthToken();
    
    if (!token) throw new Error("Authentication failed");

    let allPosts = [];
    const { data: usersData } = await axios.get(
        `${process.env.BASE_URL}/users`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    await Promise.all(Object.keys(usersData.users).map(async (userId) => {
        const { data: postsData } = await axios.get(
            `${process.env.BASE_URL}/users/${userId}/posts`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        allPosts.push(...postsData.posts);
    }));

    allPosts.sort((a, b) => b.id - a.id);
    const latestPosts = allPosts.slice(0, 5);

    return latestPosts;
};

module.exports = getLatestPosts;