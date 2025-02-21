import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import User from "@/app/modals/userModal";

export async function GET (){
    try {
        await dbConnect()
        const users = await User.find()
        if(!users){
            return NextResponse.json({message:"Users not found"},{status:404})
        }
        return NextResponse.json({users},{status:200})
    } catch (error) {
        return NextResponse.json({message:"something went wrong ", error},{status:500})
    }
}