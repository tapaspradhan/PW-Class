
import app from "./app.js"
import connectToDB from "./config/dbConnection.js";
import cloudinary from "cloudinary"

const PORT=process.env.PORT || 5000;
// Cloudinary Configration
cloudinary.v2.config({
    cloud_name:process.env.CLOUDNIARY_CLOUD_NAME,
    api_key:process.env.CLOUDNIARY_API_KEY,
    api_secret:process.env.CLOUDNIARY_API_SECRET,
})

app.listen(PORT,async()=>{
    await connectToDB()
    console.log(`App is running of http:localhost:${PORT}`);
})