"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";

const Checkout = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined);
  const {subtotal}  = useCart()
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

  if(loading){
    return <>
    <div className="w-full min-h-screen flex items-center justify-center ">
        <h1>loading....</h1>
    </div>
    </>
  }

  return (
    <div className="w-full min-h-screen flex  justify-center bg-gradient-to-br from-[#FFFFFF] to-[#79CFFF]">
      <div className="container mx-auto w-full max-w-lg h-fit mt-12 px-4 py-12  rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>

        {/* Address Selection */}
        {addresses.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Select an Address</h2>
            <Select onValueChange={setSelectedAddress} value={selectedAddress}>
              <SelectTrigger className="w-full border-[1px] border-[#ea580c]">
                <SelectValue placeholder="Choose an address" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((addr, index) => (
                  <SelectItem key={index} value={addr.street_address}>
                    {addr.name}, {addr.street_address}, {addr.city}, {addr.state}, {addr.postal_code}, {addr.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p className="text-center"></p>
        )}

       

        {/* Add New Address Dialog */}
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#ea580c]/90 text-white hover:bg-  [#ea580c]/80 hover:text-white" >Add New Address</Button>
            
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle >Add New Address</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <Input placeholder="Full Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
              <Input placeholder="Street Address" value={newAddress.street_address} onChange={(e) => setNewAddress({ ...newAddress, street_address: e.target.value })} />
              <Input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
              <Input placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
              <Input placeholder="Postal Code" value={newAddress.postal_code} onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })} />
              <Input placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} />
              <Input placeholder="Phone Number" value={newAddress.phone_number} onChange={(e) => setNewAddress({ ...newAddress, phone_number: e.target.value })} />
            </div>
            <Button className="w-full" onClick={handleAddAddress} disabled={loading}>
              {loading ? "Saving..." : "Save Address"}
            </Button>
          </DialogContent>
        </Dialog>

        <div className="my-4 w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold">Cart Value </h1>
            <h1 className="text-xl font-semibold">${subtotal}</h1>
            
        </div>

        <Button className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90">Pay Now</Button>
      </div>
    </div>
  );
};

export default Checkout;
