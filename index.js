import app from './app.js';
import connectiontodb from './config/db.config.js'
import Razorpay from 'razorpay';
const Port = process.env.PORT || 5000
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
app.listen(Port,async ()=>{
    await connectiontodb();
    console.log(`Server is running on port http://localhost:${Port}`)
})