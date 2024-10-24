import { Schema, model, models } from 'mongoose';



export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string; // Type URL is not commonly used in TypeScript, so it's string here
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string; // Type URL is not commonly used in TypeScript, so it's string here
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {_id: string; fristName: string;
    lastName: string;

  }; // Use Mongoose's ObjectId type for the author field
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureUrl: { type: URL, required: true },
  width: { type: Number },
  height: { type: Number },
  config: { type: Object },
  transformationUrl: { type: URL },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Image = models?.Image || model('Image', ImageSchema);
export default Image;