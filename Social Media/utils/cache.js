const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 }); // Cache data for 60 seconds
module.exports = cache;