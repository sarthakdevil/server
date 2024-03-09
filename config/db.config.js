import mongoose from 'mongoose'
mongoose.set ('strictQuery',false);
const Schema = mongoose.Schema;

const connectiontodb = async ()=>{
try{
    const { connection } =await mongoose.connect('mongodb://127.0.0.1:27017/lms');

if(connection){
    console.log("Mongodb is connected")
}

}catch(error){
    console.error("Error in connecting to the database",error);
    process.exit(1);
}
}

export default connectiontodb