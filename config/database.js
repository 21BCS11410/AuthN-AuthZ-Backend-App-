const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then( () => {console.log("Database connected Successfully")} )
    .catch( (err) => {
        console.log("Issue in DB connection");
        console.log(err);
        console.log(err.message);
        process.exit(1);
    });
}

module.exports = dbConnect;
