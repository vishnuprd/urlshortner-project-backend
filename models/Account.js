const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,   
    },
    email: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    organization: {
        type: String,
    },
    location: {
        type: String,
    },
    address: {
        type: String,
    },
    dateofbirth: {
        type: Date,
    }
});


const AccountModel = mongoose.model("user-account", AccountSchema);

module.exports = { AccountModel };
