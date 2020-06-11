let envs = {}
if(process.env.NODE_ENV !=="production"){
	const dotenv = require("dotenv");
	const result = dotenv.config();
	envs = result.parsed
}

const mongoConfig = process.env.MONGO_DB_URL || envs.MONGO_DB_URL;


const config = {
	firebaseConfig,
	mongoConfig
}

exports.firebaseConfig = firebaseConfig
exports.mongoConfig = mongoConfig

module.exports = config;