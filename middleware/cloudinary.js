const cloudinary = require(`cloudinary`).v2
require(`dotenv`).config()
const {cloud_name,api_key,api_secret} = process.env


cloudinary.config({
    cloud_name,api_key,api_secret,secure:true
})

module.exports = cloudinary