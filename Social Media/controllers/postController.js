const getLatestPosts = require("../utils/getLatestPosts");
const getPopularPosts = require("../utils/getPopularPosts");

const postController =  async (req, res) => {
    try {
        const type = req.query.type;
        if (type === "latest") {
            const latestPosts = await getLatestPosts();
            res.json(latestPosts);
        } else if (type === "popular") {
            const popularPosts = await getPopularPosts();
            res.json(popularPosts);
        } else {
            res.status(400).json({ error: "Invalid type. Use 'latest' or 'popular'." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { postController };