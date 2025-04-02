const getUsersWithPostCounts = require("../utils/getUsersWithPostCount");

const userController = async (req, res) => {
    try {
        const topUsers = await getUsersWithPostCounts();
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching top users." });
    }
}
module.exports = {userController};