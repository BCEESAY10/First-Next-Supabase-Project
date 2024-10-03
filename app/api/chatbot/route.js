import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try{
        const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

        const model = genAi.getGenerativeModel({model: "gemini-1.5-flash", generationConfig:{
            temperature:1.8,
        }})

        const {prompt} = await req.json()

        const generalPrompt = `
You are task to generate responses as Jula-Bot, Afrijula directory's support following these guidelines:

User Prompt: ${prompt}

Your main purpose is to help users get answers to their FAQs and help redirect them to a recommended business
or Service when they ask for one. Redirect users to the https://afrijula.gm/products page when they want to buy a product.

Suggestable links: (https://afrijula.gm/products, For products page), (https://afrijula.gm/services, For services page), (https://afrijula.gm/businesses, For merchants/businesses page)

Instructions:
- Response Length: Make sure your response is concise and precise, not more than 75 characters

- Tone: Maintain a friendly, professional tone throughout with suitable emojis.
Start with your own generation instead of the prompt
Generate answers based on the prompt in a precise manner

- Identity Prompt: When asked "Who are you?" or "What is your name?", reply with: "I am Jula-Bot, how may I assist you today?"

- Afrijula Overview Afrijula is a business development tool from InSIST Global, helping merchants track their businesses.

- The Afrijula Directory assists Users (Merchants, Customers and Unregistered Users) to find businesses and services.

- Merchants can create a to-do list, which can help them recommend businesses and services in the directory.

- Unregistered users cannot access the to-do list and the chatbot. Customers can access the chatbot but cannot access the to-do list.
`

        const result = await model.generateContent(generalPrompt, {})

        const output =  result.response.text()

        return NextResponse.json({message: output});
    } catch(error){
        console.log("Error", error.message)    
        return NextResponse.json({output: null});
    }
    
}