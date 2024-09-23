import { NextResponse } from "next/server"
import { users } from "../../../db/users"
import { db } from "../../../db"

export async function GET(request ,response){

    const message = "So far so good!"

    // const users = Array.from(Array(100).fill(1)).map((e, index)=>({id:Number(index)+1, name: "User " +Number(index+1)}))

    const data = await db.select({
        id: users.id,
        email: users.email,
        first_name: users.firstName,
        last_name: users.lastName,
        password: users.password
    }).from(users)

    return NextResponse.json({
        message,
        users: data
    })

}