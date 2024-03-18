const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {UrlShortModel} = require('../models/Urlshort') ;

router.use(bodyParser.json()); 
router.use(express.json());


router.post('/url-shorten', async (req, res) => {
    try {
      const { longUrl } = req.body;
      console.log(longUrl);
  
      // Check if the URL already exists in the database
      const existingUrl = await UrlShortModel.findOne({ longUrl });
      if (existingUrl) {
        // If the URL exists, increment its clickCount
        existingUrl.clickCount++;
        await existingUrl.save();
        return res.status(200).json({
          message: 'Short URL already exists. Click count incremented.',
          shortUrl: existingUrl.shortUrl,
          clickCount: existingUrl.clickCount,
        });
      }
  
      // If the URL doesn't exist, generate a new short URL
      const shortUrl = generateShortUrl();
  
      const newShortUrl = await UrlShortModel.create({
        longUrl: longUrl,
        shortUrl: shortUrl,
        clickCount: 0
      });
  
      console.log("Short URL created:", shortUrl);
      res.status(200).json({
        message: 'Short URL created successfully',
        shortUrl: shortUrl,
        clickCount: newShortUrl.clickCount
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
function generateShortUrl() { 
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
    const characterLength = 4; 
    let shortUrl = ""; 

    for (let i = 0; i < characterLength; i++) { 
        const randomIndex = Math.floor(Math.random() * characters.length); 
        shortUrl += characters[randomIndex]; 
    }
    return shortUrl;
}






module.exports = router;