import mongoose from "mongoose"

interface AddressType {
    user_id: string;
    name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone_number?: string;
}


const address = new mongoose.Schema<AddressType>({
    user_id: { type: String, required: true},
    name: { type: String, required: true},
    street_address: { type: String, required: true},
    city: { type: String , required: true},
    state: { type: String , required: true},
    postal_code: { type: String , required: true},
    country: { type: String, required: true},
    phone_number: { type: String , required: true}
})

const AddressModal = mongoose.model("Address", address)

export default AddressModal