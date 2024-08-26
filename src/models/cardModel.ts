import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

const cardStatus = ["Active", "Completed"];

export interface ICardItem extends Document {
  product: IProduct;
  quantity: number;
  unitPrice: number;
}

export interface ICard extends Document {
  userId: ObjectId | string;
  items: ICardItem[];
  totalAmount: number;
  status: "Active" | "Completed";
}

// card item schema
const cardItemSchema = new Schema<ICardItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
});

// card schema
const cardSchema = new Schema<ICard>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    rquired: true,
  },
  items: {
    type: [cardItemSchema],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: cardStatus,
    default: "Active",
  },
});

export const cardModel = mongoose.model<ICard>("Card", cardSchema);
