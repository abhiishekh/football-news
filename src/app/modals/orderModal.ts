import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orders: [
    {
      product: {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        title: String,
        images: [String],
        price: Number
      },
      address: {
        street_address: String,
        city: String,
        state: String,
        country: String,
        postal_code: String
      },
      razorpayOrderId: String,
      razorpayPaymentId: String,
      amount: Number,
      status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
