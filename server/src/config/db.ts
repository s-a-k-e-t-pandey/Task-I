import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db_Uri = process.env.MONGO_URI || "";
console.log('Connecting to DB:', db_Uri);
const dbClient = async () => {
    try{
        const conn = await mongoose.connect(db_Uri);
        console.log('Connected to DB Successfully: ', conn.connection.host);
    }catch(err){
        console.error(err);
    }
}

export default dbClient;
