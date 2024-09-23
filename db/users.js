import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('signup', {

    id: serial('id').primaryKey(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    email: varchar('email', { length: 256 }),
    password: varchar('password', { length: 256 }),


});