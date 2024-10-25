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

// Interface to define the structure of the Mongoose connection
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Disable the conflicting ESLint rule for this file
/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  // Use let to declare mongoose globally
  let mongoose: MongooseConnection | undefined;
}

// Initialize the cached connection
let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// If not already cached, set up a new cache object
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to the database
export const connectToDatabase = async () => {
  // Return existing connection if available
  if (cached.conn) return cached.conn;

  // Throw an error if the MongoDB URL is missing
  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  // Establish a new connection if not already connected
  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: 'imaginify',
    bufferCommands: false,
  } as mongoose.ConnectOptions);

  // Wait for the connection to resolve
  cached.conn = await cached.promise;
  return cached.conn;
};

// Export the cached connection for use in the app
export default cached.conn;