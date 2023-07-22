const mongoose = require('mongoose');

/**
 * Function to connect to the MongoDB database using Mongoose.
 *
 * It uses the environment variable DB_URL to establish the connection.
 * The function logs a success message if the connection is established successfully.
 * If there is any error during the connection, it logs an error message.
 */
const dbconnect = () => {
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to database successfully");
        })
        .catch((err) => {
            console.log(`Error connecting to database: ${err}`);
        });
};

// Export the database connection function
module.exports = dbconnect;
