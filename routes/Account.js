const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {AccountModel} = require('../models/Account') ;

router.use(bodyParser.json()); 
router.use(express.json());


router.post('/useraccount', async (req, res) => {
    try {
        const { firstname, lastname, email, phonenumber, organization, location, address, dateofbirth } = req.body;

        const accountUser = await AccountModel.findOne({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber,
            organization: organization,
            location: location,
            address: address,
            dateofbirth: dateofbirth
        });

        if (accountUser) {
            return res.status(200).json({ "message": "Account user already exists" });
        } else {
            const newAccountUser = await AccountModel.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonenumber: phonenumber,
                organization: organization,
                location: location,
                address: address,
                dateofbirth: dateofbirth
            });
            console.log("New Account user created:", newAccountUser);
            return res.status(200).json({ "message": "Account user created successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;