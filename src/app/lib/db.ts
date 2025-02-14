// utils/dbConnect.ts
import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    // If already connected, return
    return;
  }

  try {
    // Establish the connection
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

export default dbConnect;
