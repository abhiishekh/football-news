"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "react-hot-toast";
import { Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import axios from "axios";

const Checkout = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined);
  const { subtotal } = useCart();
  const [newAddress, setNewAddress] = useState({
    name: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone_number: "",
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success alert state

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/addresses", {
        headers: { token: localStorage.getItem("token") || "" },
      });
      const data = await res.json();
      if (res.ok) {
        setAddresses(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch addresses.");
    }
  };

  const handleAddAddress = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(newAddress),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Address added successfully!");
        setAddresses((prev) => [...prev, newAddress]);
        setIsAddingAddress(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error adding address.");
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address before proceeding with payment.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/orders",
        {
          productId: "67adb290df833d923eb4cb19",
          razorpayOrderId: "orderID",
          razorpayPaymentId: "Payment ID",
          amount: subtotal,
          status: "pending",
          selectedAddress,
        },
        {
          headers: { token },
        }
      );

      if (response.status === 201) {
        toast.success("Order created successfully!");
        setSuccessMessage("Your order has been placed successfully!");

        // Hide alert after 2 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      } else {
        toast.error("Something went wrong while creating the order.");
      }
    } catch (error) {
      toast.error("Failed to create order. Please try again later.");
      console.error("Order Creation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]">
      <div className="container mx-auto w-full max-w-lg h-fit mt-12 px-4 py-12 rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>

        {successMessage && (
          <Alert className="mt-2 fixed top-4 right-4 z-50 w-fit text-green-500 flex gap-1">
            <AlertTitle className="flex items-center"><Check /> Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {addresses.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Select an Address</h2>
            <Select onValueChange={setSelectedAddress} value={selectedAddress}>
              <SelectTrigger className="w-full border-[1px] border-[#ea580c]">
                <SelectValue placeholder="Choose an address" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((addr, index) => (
                  <SelectItem key={index} value={addr}>
                    {addr.name}, {addr.street_address}, {addr.city}, {addr.state}, {addr.postal_code}, {addr.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p className="text-center">No addresses available</p>
        )}

        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#ea580c]/90 text-white hover:bg-[#ea580c]/80">Add New Address</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {Object.keys(newAddress).map((key) => (
                <Input
                  key={key}
                  placeholder={key.replace("_", " ").toUpperCase()}
                  value={newAddress[key as keyof typeof newAddress]}
                  onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })}
                />
              ))}
            </div>
            <Button className="w-full" onClick={handleAddAddress} disabled={loading}>
              {loading ? "Saving..." : "Save Address"}
            </Button>
          </DialogContent>
        </Dialog>

        <div className="my-4 w-full flex justify-between items-center">
          <h1 className="text-xl font-semibold">Cart Value</h1>
          <h1 className="text-xl font-semibold">${subtotal}</h1>
        </div>

        <Button onClick={handlePayment} className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
