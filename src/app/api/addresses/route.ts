import type { NextApiRequest, NextApiResponse } from "next";
import AddressModal from "@/app/modals/addressModal";
import dbConnect from "@/app/lib/db"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Ensure the database connection is established

  switch (req.method) {
    case "POST":
      try {
        const { user_id, name, street_address, city, state, postal_code, country, phone_number } = req.body;

        // Create a new address instance
        const newAddress = new AddressModal({
          user_id,
          name,
          street_address,
          city,
          state,
          postal_code,
          country,
          phone_number,
        });

        // Save the address to the database
        await newAddress.save();
        res.status(201).json(newAddress);
      } catch (error) {
        res.status(400).json({ message: "Error creating address", error });
      }
      break;

    case "GET":
      try {
        // Fetch all addresses (can later filter by user_id if needed)
        const addresses = await AddressModal.find();
        res.status(200).json(addresses);
      } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
