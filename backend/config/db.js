require('dotenv').config();
const mongoose = require('mongoose');

let MONGODB = process.env.MONGODB_URI;

const initializedatabase = async () => {
    await mongoose
    .connect(MONGODB)
    .then(() => console.log('Database connected successfully.'))
    .catch((error) => console.log('Error connecting to the database', error))
}

module.exports = initializedatabase