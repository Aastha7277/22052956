const cache = require("./cache");
const fetchData = require("./fetchData");
const getUsersWithPostCounts = async () => {
    console.log("Fetching users with post counts...");
    const cachedData = cache.get("top_users");
    if (cachedData) return cachedData;
    
    const usersData = await fetchData(`${process.env.BASE_URL}/users`);
    if (!usersData) return [];
    
    let userPostCounts = [];
    await Promise.all(Object.keys(usersData.users).map(async (userId) => {
        const postsData = await fetchData(`${process.env.BASE_URL}/users/${userId}/posts`);
        if (postsData) {
            userPostCounts.push({
                userId,
                name: usersData.users[userId],
                postCount: postsData.posts.length,
            });
        }
    }));
    
    userPostCounts.sort((a, b) => b.postCount - a.postCount);
    const topUsers = userPostCounts.slice(0, 5);
    cache.set("top_users", topUsers);
    return topUsers;
};

module.exports = getUsersWithPostCounts;