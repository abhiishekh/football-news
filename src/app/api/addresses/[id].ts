import dbConnect from "@/app/lib/db";
import AddressModal from "@/app/modals/addressModal";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Ensure the database connection is established

  const { id } = req.query; // Get address ID from the query

  switch (req.method) {
    case "GET":
      try {
        // Fetch the address by ID
        const address = await AddressModal.findById(id);

        if (!address) {
          return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json(address);
      } catch (error) {
        res.status(500).json({ message: "Error fetching address", error });
      }
      break;

    case "PUT":
      try {
        const { user_id, name, street_address, city, state, postal_code, country, phone_number } = req.body;

        // Update the address by ID
        const updatedAddress = await AddressModal.findByIdAndUpdate(
          id,
          {
            user_id,
            name,
            street_address,
            city,
            state,
            postal_code,
            country,
            phone_number,
          },
          { new: true } // Return the updated address
        );

        if (!updatedAddress) {
          return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json(updatedAddress);
      } catch (error) {
        res.status(400).json({ message: "Error updating address", error });
      }
      break;

    case "DELETE":
      try {
        // Delete the address by ID
        const deletedAddress = await AddressModal.findByIdAndDelete(id);

        if (!deletedAddress) {
          return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({ message: "Address deleted" });
      } catch (error) {
        res.status(400).json({ message: "Error deleting address", error });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
