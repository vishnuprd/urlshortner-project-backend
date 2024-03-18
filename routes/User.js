const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { LoginPageModel} = require('../models/Login');
const{RegisterPageModel}=require('../models/Register');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


router.use(bodyParser.json()); 
router.use(express.json());

router.post('/createuser', async (req, res) => {
    try {
        const { fullname, email, password, loginCount } = req.body; 

        console.log(fullname, email, password,loginCount);

        const existingUser = await RegisterPageModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await RegisterPageModel.create({
            fullname,
            email,
            password: hashedPassword,
            loginCount // Corrected variable name to match the schema
        });

        return res.status(200).json({ message: 'User registration successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// User login endpoint
router.post('/loginuser', async (req, res) => {
    try {
        const { email, password,loginCount } = req.body;
        console.log( email, password,loginCount);

        const lowercaseEmail = email.toLowerCase();

        console.log('Login Email:', lowercaseEmail);
        console.log('Login Password:', password);

        const user = await RegisterPageModel.findOne({ email: lowercaseEmail });

        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        console.log('User Found:', user);

        const passwordMatch = await bcrypt.compare(password, user.password);

        console.log('Password Match:', passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        const token = jwt.sign({ userId: user._id }, 'vsjhfbfsjfwsjhfjhsvfjhsjfsjfvjs');
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;