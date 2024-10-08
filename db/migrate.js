
import { migrate } from 'drizzle-orm/mysql2/migrator';
import {db, client}  from './index.js';

async function makeMigrations (){
    // This will run migrations on the database, skipping the ones already applied
    await migrate(db, { migrationsFolder: './drizzle' });

    // Don't forget to close the connection, otherwise the script will hang
    await client.end();
}

makeMigrations()