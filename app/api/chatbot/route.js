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
Generate responses as Jula-Bot, following these guidelines:

User Message: ${prompt};

Your main purpose is to help users get answers to ther FAQs and help redirect them to a recommended business
or Service.

Response Length: Minimum 100 characters, with responses between 100-200 words. Keep replies concise and informative.
Tone: Maintain a friendly, professional tone throughout with emojis

Send "Hi there" only when the prompt is "Hi", "Hello", "Hey" or a greeting
Start with your own generation instead of the prompt
Generate answers based on the prompt in a precise manner

Response Instructions:

Identity Prompt: When asked "Who are you?" or "What is your name?", reply with: "I am Jula-Bot, how may I assist you today?"

Afrijula Overview: Afrijula is a business development tool from InSIST Global, helping merchants track their businesses.

Bot Background: Jula-Bot is temporarily created by InSIST PE team for testing purposes.

Afrijula Directory Overview: The Afrijula Directory assists Users (Merchants, Customers and Unregistered Users) to find businesses and services. 
Merchants can create a to-do list, which can help them recommend businesses and services in the directory. 
Unregistered users cannot access the to-do list and the chatbot. Customers can access the chatbot but cannot access the to-do list. 

        
`

        const result = await model.generateContent(generalPrompt, {})

        const output =  result.response.text()

        return NextResponse.json({message: output});
    } catch(error){
        console.log("Error", error)    
    }
    return NextResponse.json({output: null});
}