const cache = require("./cache");
const fetchData = require("./fetchData");

const getPopularPosts = async () => {
    const cachedData = cache.get("popular_posts");
    if (cachedData) return cachedData;
    
    let commentCounts = {};
    let mostCommentedPosts = [];
    const usersData = await fetchData(`${process.env.BASE_URL}/users`);
    if (!usersData) return [];
    
    await Promise.all(Object.keys(usersData.users).map(async (userId) => {
        const postsData = await fetchData(`${process.env.BASE_URL}/users/${userId}/posts`);
        if (!postsData) return;
        
        await Promise.all(postsData.posts.map(async (post) => {
            const commentsData = await fetchData(`${process.env.BASE_URL}/posts/${post.id}/comments`);
            if (commentsData) {
                commentCounts[post.id] = commentsData.comments.length;
                mostCommentedPosts.push({ ...post, commentCount: commentsData.comments.length });
            }
        }));
    }));
    
    const maxComments = Math.max(...Object.values(commentCounts));
    const popularPosts = mostCommentedPosts.filter(post => post.commentCount === maxComments);
    cache.set("popular_posts", popularPosts);
    return popularPosts;
};

module.exports = getPopularPosts;