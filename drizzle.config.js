import { defineConfig } from 'drizzle-kit';
import {dbCredentials} from "./db/index"

export default defineConfig({
  schema: './db/users.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: dbCredentials,
});