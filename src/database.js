import mongoose from 'mongoose';
export const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if the connection fails
    }
};