// import mongoose, { Mongoose } from 'mongoose';

// const MONGODB_URL = process.env.MONGODB_URL;

// interface MongooseConnection {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// }
// let cached: MongooseConnection = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = {
//     conn: null, 
//     promise: null
//   }
// }

// export const connectToDatabase = async () => {
//     if (cached.conn) return cached.conn;
  
//     if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');
  
//     cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
//       dbName: 'imaginify',
//       bufferCommands: false,
//     });
  
//     cached.conn = await cached.promise;
//     return cached.conn;
//   }
  
import mongoose, { Mongoose } from 'mongoose';

// MongoDB connection URL
const MONGODB_URL = process.env.MONGODB_URL;

// Define Mongoose connection interface
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Initialize the cached connection from the global object
let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// Set up a new cache object if not already set
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to the database
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: 'imaginify',
    bufferCommands: false,
  } as mongoose.ConnectOptions);

  cached.conn = await cached.promise;
  return cached.conn;
};

// Export the cached connection
export default cached.conn;
