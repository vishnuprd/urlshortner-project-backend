const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    }, 
    subject: {
        type: String,
    },
    message: {
        type: String,
    }
}, {
    timestamps: true,
});

const ContactModel = mongoose.model('Contact', ContactSchema);

module.exports = ContactModel;
