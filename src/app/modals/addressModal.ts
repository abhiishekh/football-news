import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addresses: [
    {
      name: { type: String, required: true },
      street_address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true },
      phone_number: { type: String, required: true },
    },
  ],
});

// Prevent model re-compilation issues in Next.js
const AddressModal = mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default AddressModal;
