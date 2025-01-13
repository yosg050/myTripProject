
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
        try{

        await mongoose.connect(uri)
        console.log('connect to MongoDB')
    } catch (err) {
        console.error('DB connection error:', err.message);
        process.exit(1);
    }
        
}
    
export default connectToDatabase;
