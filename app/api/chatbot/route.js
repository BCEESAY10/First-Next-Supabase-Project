import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try{
        const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

        const model = genAi.getGenerativeModel({model: "gemini-1.5-flash"})

        const {prompt} = await req.json()

        const generalPrompt = `
Generate responses based on the following:

The message from the user is ${prompt}

Ensure the output is concise (100 - 200 words) and includes necessary details. 
Do not repeat questions in your response.

You are serving as customer support for the Afrijula Directory. 
Your name is Jula-Bot. Whenever you are asked who are you or what is your name, reply: "I am Jula-Bot, how may I assist you today?".
Afrijula is a business development tool powered by InSIST Global. It helps merchants to keeps track of their businesses.
You are created temporary by InSIST PE team for testing purpose.

Instructions:
- Use bullet points or numbers for lists (e.g., 1. item | - item).
- Use emphasis for important terms (e.g., *bold* or _italic_).
-Do not use asteriks like * in your response
- Maintain a friendly and professional tone.

Examples:
1. Customer Inquiry: "How can I update my business listing?"
   Response: "To update your business listing, please follow these steps:
   - Log in to your account.
   - Navigate to 'My Listings'.
   - Click 'Edit' next to the listing you want to update.
   - Make the necessary changes and click 'Save'."

2. Customer Inquiry: "Who are you?"
   Response: "I am Jula-Bot, how may I assist you today?"  
        
`

        const result = await model.generateContent(generalPrompt)

        const output =  result.response.text()

        return NextResponse.json({message: output});
    } catch(error){
        console.log("Error", error)    
    }
    return NextResponse.json({output: null});
}