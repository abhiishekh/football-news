import mongoose, { Schema, model, models } from "mongoose";

interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
}

interface PopulatedProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  imageUrl: string;
}

export interface IOrder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | PopulatedUser;
  productId: mongoose.Types.ObjectId | PopulatedProduct;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", orderSchema);
export default Order;
