import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('signup', {

    id: serial('id').primaryKey(),
    firstName: varchar('first_name', { length: 15 }),
    lastName: varchar('last_name', { length: 15 }),
    email: varchar('email', { length: 256 }).unique().notNull(),
    password: varchar('password', { length: 256 }),


});

// export const users = pgTable('users', {
//     id: serial('id').primaryKey(),
//     firstName: varchar('first_name', { length: 15 }),
//     lastName: varchar('last_name', { length: 15 }),
//     email: varchar('email', { length: 256 }).unique().notNull(),
//     password: varchar('password', { length: 256 }),
// });