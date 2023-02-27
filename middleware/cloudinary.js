// const cloudinary = require("cloudinary").v2;
import dotenv from "dotenv"
import * as cloudinary from 'cloudinary'

dotenv.config({path: ".env"})

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
