import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  email: string;
  date: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]); // Fix: State should be an array

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.users); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto border-[1px] p-4 border-black rounded-md mt-12 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">User's List</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user._id || index} className="h-12">
                  <TableCell>{user.name || "N/A"}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "No Date Available"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                  No Users Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
