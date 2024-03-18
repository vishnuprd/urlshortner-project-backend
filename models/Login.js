
const mongoose = require('mongoose');



const LoginPageSchema = new mongoose.Schema({
    email: {
        type: String,
      
    },
    password: {
        type: String,
       
    },
    loginCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const LoginPageModel = mongoose.model('login-registration', LoginPageSchema);

module.exports = {LoginPageModel};
    



  
    