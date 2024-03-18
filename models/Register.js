const mongoose = require('mongoose');
const validator = require('validator'); 

const RegisterPageSchema = new mongoose.Schema({
    fullname:{
        type:String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password must be less than 128 characters long'],
        // Separate validations for clarity
        validate: [
            {
                validator: validator.isStrongPassword, // Use built-in validator for password strength
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'
            },
            {
                validator: (value) => !/\s/.test(value), // Ensure password doesn't contain whitespace
                message: 'Password must not contain whitespace'
            }
        ]
    },
    loginCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});




const RegisterPageModel = mongoose.model('user-registration', RegisterPageSchema);

module.exports = { RegisterPageModel };
