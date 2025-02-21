import dbConnect from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from "@/app/modals/userModal";

const JWT = process.env.JWT || "jwt_secret"

interface DecodedToken extends JwtPayload {
  userId: string;
}
export async function GET(req:NextRequest){

    try {
        await dbConnect()
        
        const token = req.headers.get("token")
        if(!token){
            return NextResponse.json({message:"Unauthorized"},{status:401})
        }
        const decoded = await jwt.verify(token,JWT) as DecodedToken
        if(!decoded){
            return NextResponse.json({message:"Invalid Token or session expired"},{status:402})
        }
        const userId = decoded?.userId;

        const user = await User.findOne({_id: userId})

        if(!user){
            return NextResponse.json({message:"user not fund"},{status:404})
        }
        return NextResponse.json({name:user.name,email:user.email,createdAt:user.createdAt},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong "},{status:500})
    }
}