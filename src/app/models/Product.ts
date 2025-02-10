import mongoose, { Schema, model, models } from "mongoose";


export interface IProduct {
  _id?: mongoose.Types.ObjectId;
  name: string;
  description: string;
  imageUrl: string;
  price:number;

}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProduct>("Product", productSchema);

export default Product;
