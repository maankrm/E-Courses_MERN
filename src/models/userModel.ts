import mongoose, { Schema, Document } from "mongoose";

// create a document (the requaired information from user) you can add anything eles
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// schema to save data in the db

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// create model then export it to be able to use it where ever
const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
