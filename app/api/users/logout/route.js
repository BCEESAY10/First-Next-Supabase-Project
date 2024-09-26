import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request ,response){
    cookies().delete("sid");
    revalidatePath("/", "layout")

    return NextResponse.json({
        message : "Thank You!"
    })

}


