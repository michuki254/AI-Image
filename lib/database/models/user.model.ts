import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
  planId: string;
  creditBalance: number;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  photo: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  planId: { type: String },
  creditBalance: { type: Number, default: 0 },
});

const User = models.User || model<IUser>('User', UserSchema);
export default User;
