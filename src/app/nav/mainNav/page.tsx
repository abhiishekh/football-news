"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/app/assets/images/image.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "../sidebar/page";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownMenuu from "@/app/(components)/dropdown/page";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const { isAuthenticated, login, logout, signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSignIn = async () => {
    await login(formData.email, formData.password);
  };

  const handleSignUp = async () => {
    await signup(formData.name, formData.email, formData.password);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#1D4E89] to-[#071423] text-white flex font-alike py-2 lg:py-0 fixed top-0 z-50">
      <div className="w-full container mx-auto px-2 xl:px-0">
        <div className="w-full flex flex-wrap justify-between items-center">
          <div className="w-full lg:w-auto flex gap-2 sm:gap-10 items-center justify-between">
            <div className="flex items-center">
              <div className="h-full w-16 sm:w-24">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="Logo"
                    layout="responsive"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              <h1 className="text-3xl sm:text-5xl font-calistoga tracking-[.6rem] sm:tracking-[.7rem]">
                GoalMania
              </h1>
            </div>

            {/* Mobile sidebar toggle button */}
            <button onClick={toggleSidebar} className="lg:hidden p-2">
              {isOpen ? (
                <FaTimes className="text-white" />
              ) : (
                <FaBars className="text-white" />
              )}
            </button>
          </div>

          {/* Sidebar */}
          {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}

          <div className="hidden lg:flex px-2 justify-end">
            <div className="flex gap-1 sm:gap-10 items-center">
              <div className="text-xl">
                <CiSearch />
              </div>
              <DropdownMenuu
                title="Language"
                options={[
                  "English",
                  "French",
                  "German",
                  "Italian",
                  "Portuguese",
                ]}
                linkPrefix="/"
              />
              {/* Login / Sign Out button */}
              {isAuthenticated ? (
                // <div className="cursor-pointer text-white bg-white/10 px-4 py-2 rounded-full" onClick={logout}>
                //   Sign Out
                // </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-white/10 px-4 py-2 rounded-full ">Profile</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={'/profile'}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href={'/shop/orders'}>
                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={logout}>LogOut</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-4">
                  <Dialog>
                    <DialogTrigger className="bg-white/10 px-4 py-2 rounded-full ">
                      SignIn
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center text-3xl">
                          SignIn
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-4">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                          <Label>Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                          />
                          <Button className="text-xl" onClick={handleSignIn}>
                            Sign In
                          </Button>
                          <p className="text-lg">
                            Don't have an account{" "}
                            <span
                              className="text-blue-400 cursor-pointer"
                              onClick={() => {
                                setIsSignUp(true);
                              }}
                            >
                              Sign Up Now
                            </span>
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  {/* SignUp Dialog */}
                  <Dialog
                    open={isSignup}
                    onOpenChange={(open) => setIsSignUp(open)}
                  >
                    <DialogTrigger></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center text-3xl">
                          Sign Up
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-4">
                          <Label>Name</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              });
                            }}
                          />
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              });
                            }}
                          />
                          <Label>Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              });
                            }}
                          />
                          <Button className="text-xl" onClick={handleSignUp}>
                            Sign Up
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
