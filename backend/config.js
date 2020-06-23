let envs = {}
if(process.env.NODE_ENV !=="production"){
	const dotenv = require("dotenv");
	const result = dotenv.config();
	envs = result.parsed
}

const mongoConfig = process.env.MONGODB_URL || envs.MONGODB_URL;

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || envs.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || envs.FIREBASE_AUTH_DOMAIN, 
    databaseURL: process.env.FIREBASE_DATABASE_URL || envs.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROYECT_ID || envs.FIREBASE_PROYECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || envs.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || envs.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_API_ID || envs.FIREBASE_API_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || envs.FIREBASE_MEASUREMENT_ID
}

const secret = process.env.JWT_PASSWORD || envs.JWT_PASSWORD

const config = {
	firebaseConfig,
	mongoConfig,
	secret
}

exports.firebaseConfig = firebaseConfig
exports.mongoConfig = mongoConfig
exports.secret = secret

module.exports = config;