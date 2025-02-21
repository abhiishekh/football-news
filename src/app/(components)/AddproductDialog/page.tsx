"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useState } from 'react'

const AddproductDialog = () => {
      const [formData, setFormData] = useState<{
        title: string;
        description: string;
        price: string;
        tshirtType:string;
        gender: string;
        child: string;
        category: string;
        size: string;
        stocks: string;
        images: File[]; // Ensure images is of type File[]
      }>({
        title: "",
        description: "",
        price: "",
        tshirtType:"",
        gender: "",
        child: "",
        category: "",
        size: "",
        stocks: "",
        images: [], // Initialize as an empty array
      });

      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
    
      // Handle changes in input fields
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle file selection for images
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
          setFormData({
            ...formData,
            images: Array.from(files), 
          });
        }
      };
    
      // Handle select value change for select components
      const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle form submission
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        setIsLoading(true); // Set loading to true when the form is submitting
        setError(null); // Reset error message before submission
      
        console.log("Form data being sent:", formData);  // Log form data before sending
      
        // Upload images to Cloudinary first
        const uploadedImages = await uploadImagesToCloudinary(formData.images);
        if (!uploadedImages) {
          setError("Image upload failed");
          setIsLoading(false);
          return;
        }
        // console.log(uploadedImages)
      
        // Now prepare the data to be sent to the API
        const productData = { 
          ...formData, 
          images: uploadedImages,  // Attach the array of image URLs here
        };
      
        // Send POST request to the server using axios
        try {
          const response = await axios.post("/api/products", productData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          // console.log("Server response:", response);  // Log response from the server
      
          if (response.status === 201) {
            alert("Product added successfully");
            setFormData({
              title: "",
              description: "",
              price: "",
              tshirtType:"",
              gender: "",
              child: "",
              category: "",
              size: "",
              stocks: "",
              images: [], // Clear image field
            });
          } else {
            setError("Failed to add product");
          }
        } catch (error) {
          console.error("Error adding product", error);
          setError("Error adding product");
        } finally {
          setIsLoading(false);
        }
      };
      
    
      // Function to handle image upload to Cloudinary
      const uploadImagesToCloudinary = async (files: File[]) => {
        const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dhac6t2n1/image/upload";
        const uploadPreset = "football-ecommerce"; // Cloudinary upload preset
    
        try {
          const imageUrls = [];
          for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);
    
            // Send the file to Cloudinary
            const res = await axios.post(cloudinaryUrl, formData);
            if (res.data.secure_url) {
              imageUrls.push(res.data.secure_url); // Add the image URL to the array
            }
          }
          return imageUrls; // Return the array of image URLs
        } catch (error) {
          console.error("Error uploading images to Cloudinary", error);
          return null;
        }
      };
  return (
    <Dialog>
    <DialogTrigger className="w-fit mb-5 sm:mb-12 py-2 px-4 bg-orange-400 rounded-lg text-sm sm:text-xl font-semibold hover:bg-orange-400/90 ">
      Add a Product
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="my-5 text-xl">Add Product Information</DialogTitle>
        <DialogDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <div className="w-full">
            <Select
                value={formData.tshirtType}
                onValueChange={(value) => handleSelectChange("tshirtType", value)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="t-shirtType" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short sleeve shirt">short sleeve shirt</SelectItem>
                  <SelectItem value="long sleeve shirt">long sleeve shirt</SelectItem>
                  <SelectItem value="sleeveless Tank topsr">sleeveless Tank tops</SelectItem>
                  <SelectItem value="polo">polo</SelectItem>

                </SelectContent>
              </Select>
              </div>
            <div className="w-full flex justify-between gap-4 flex-wrap">
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="trans-gender">Trans-gender</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={formData.child}
                onValueChange={(value) => handleSelectChange("child", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boy">Boy</SelectItem>
                  <SelectItem value="girl">Girl</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="series-A">Series A</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>

                </SelectContent>
              </Select>
              <Select
                value={formData.size}
                onValueChange={(value) => handleSelectChange("size", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                  <SelectItem value="2xl">2XL</SelectItem>
                  <SelectItem value="3xl">3XL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="number"
              name="stocks"
              placeholder="Stocks"
              value={formData.stocks}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              required
            
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>

  )
}

export default AddproductDialog
