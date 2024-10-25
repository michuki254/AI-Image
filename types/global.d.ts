import { Mongoose } from 'mongoose';

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Extend globalThis with mongoose connection
  var mongoose: MongooseConnection | undefined;
}

// Make sure the file is treated as a module
export {};
