import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  productId?: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface Cart extends Document {
  userId?: mongoose.Types.ObjectId;
  items: CartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<CartItem>({
  productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = new Schema<Cart>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  items: { type: [cartItemSchema], required: true },
  total: { type: Number, default: 0 },
}, { timestamps: true });

const CartModal = mongoose.models.Cart || mongoose.model<Cart>("Cart", cartSchema);

export default CartModal;
