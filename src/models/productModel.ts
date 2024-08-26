import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: number;
  discription: string;
  ratings: number;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  discription: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
    default: 0,
  }
  
});

const productModel = mongoose.model<IProduct>("Product", productSchema);

export default productModel;
