import mongoose, { Document, Model } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  userId: string;
  email: string;
  createdAt: Date;
}

// Define the User schema
const userSchema = new mongoose.Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists to avoid redefining it
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;