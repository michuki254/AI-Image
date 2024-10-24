import mongoose, { Mongoose } from 'mongoose';

const mongoDBUrl = process.env.MONGODB_URL as string;

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  (global as any).mongoose = cached;
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!mongoDBUrl) {
    throw new Error('MongoDB URL is not defined.');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoDBUrl, {
      dbName: 'imaginify',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
