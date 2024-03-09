import app from './app.js';
import connectiontodb from './config/db.config.js'

const Port = process.env.PORT || 5000

app.listen(Port,async ()=>{
    await connectiontodb();
    console.log(`Server is running on port http://localhost:${Port}`)
})