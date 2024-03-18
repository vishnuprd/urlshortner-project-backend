const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {ContactModel} = require('../models/Contact') ;

router.use(bodyParser.json()); 
router.use(express.json());

router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message, image } = req.body;

        const Contactuser = await ContactModel.findOne({
            name,
            email,
            subject,
            message,
            image
        });

        if (Contactuser) {
            return res.status(200).json({ "message": "Contact user contact already exists" });
        } else {
            const newContactuser = await ContactModel.create({
                firstname: name,
                email: email,
                subject: subject,
                message: message,
            
            });
            console.log("New contact user created:", newContactuser);
            return res.status(200).json({ "message": "Contact user created successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;