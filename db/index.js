import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'



export const dbCredentials =  {
    database:"postgres",
    port:6543,
    host:"aws-0-eu-central-1.pooler.supabase.com",
    user:"postgres.knzufkwqghdbpdxsgvhv",
    password: "Bceesay#10bc"
}

export const client = postgres(dbCredentials)
export const db = drizzle(client);
