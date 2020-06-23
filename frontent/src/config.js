let envs ={}
if(process.env.NODE_ENV !== "production"){
    const dotenv = require("dotenv")
    const result = dotenv.config()
    envs = result.parsed
}

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_API_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

//const dbURL = process.env.MONGO_DB_URL || envs.MONGO_DB_URL

const config = {
    firebaseConfig
}

exports.firebaseConfig = firebaseConfig
//exports.dbURL = dbURL

module.exports = config;