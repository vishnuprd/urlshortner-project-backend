const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });
const cors = require('cors')



const UserRoute = require('./routes/User.js');
const UrlshortnerRoute = require('./routes/Urlshortner.js'); 
const ContactRoute = require('./routes/Contact.js');
const AccountRoute = require('./routes/Account.js');

app.use(cors()); 
app.use('/user', UserRoute);
app.use('/urlshortner', UrlshortnerRoute);
app.use('/contactuser',ContactRoute);
app.use('/account', AccountRoute);

const connectionString = 'mongodb://localhost:27017/url-shortner-project';




mongoose.connect(connectionString);
mongoose.connection.on('connected', () => console.log("Connected to MongoDB"));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
console.log(connectionString);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
