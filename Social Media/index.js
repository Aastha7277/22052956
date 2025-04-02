const express = require("express");
const dotenv = require('dotenv');
const getUsersWithPostCounts = require("./utils/getUsersWithPostCount");
const getLatestPosts = require("./utils/getLatestPosts");
const getPopularPosts = require("./utils/getPopularPosts");
const { postController } = require("./controllers/postController");
const { userController } = require("./controllers/userController");
dotenv.config();

const app = express();
const PORT = 3000;
app.get("/users", userController);

app.get("/posts", postController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
