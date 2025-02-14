const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//adding a cookie parser
const cookieparser = require("cookie-parser");
app.use(cookieparser());

//adding json parser
app.use(express.json());

const dbConnect = require('./config/database')
dbConnect();

//import and mount route
const user = require('./routes/user');
app.use("/api/v1", user);

//activate
app.listen(PORT, () => {
    console.log(`App is listening at port no. ${PORT}`);
});
