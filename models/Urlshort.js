const mongoose = require('mongoose')

    const UrlShortSchema = new mongoose.Schema({
        longUrl: {
            type: String,
        },
        shortUrl: {
            type: String,
            unique: true,
        },
        clickCount: {
            type: Number,
            default: 0,
        }
    }, {
        timestamps: true,
    });
    
    const UrlShortModel = mongoose.model("url-shorten", UrlShortSchema); 
    
    module.exports = { UrlShortModel };
    

