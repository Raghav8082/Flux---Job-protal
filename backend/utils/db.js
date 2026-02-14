import mongoose from'mongoose';
const connectDB = async()=>{
    try{
        const uri = process.env.MONGOOSE_URI;
        if (!uri) {
            throw new Error("MONGOOSE_URI is not set");
        }
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    }
    catch(error){
        console.error('MongoDB connection failed:', error?.message || error);
        throw error;
    }
}
export default connectDB;
