import mongoose, { Schema, Document } from "mongoose";

interface WishListItems {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface WishList extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: WishListItems[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const wishListItemSchema = new Schema<WishListItems>({
  productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 }, 
  price: { type: Number, required: true, min: 0 },
});

const wishListSchema = new Schema<WishList>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  items: { type: [wishListItemSchema], required: true },
  total: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

// Check if model already exists to prevent overwriting in development mode
const WishListModal = mongoose.models.WishList || mongoose.model<WishList>("Wishlist", wishListSchema);

export default WishListModal;
