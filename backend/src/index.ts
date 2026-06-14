import process from 'node:process'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import 'dotenv/config'

const database_url = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL_PROD
  : process.env.DATABASE_URL_DEV

if (!database_url) {
  throw new Error('Database URL not configured.  Please check your .env file')
}

console.warn(`Connecting to ${process.env.NODE_ENV} database...`)

const pool = new Pool({
  connectionString: database_url,
<<<<<<< HEAD
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
=======
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
>>>>>>> 4fae0e7 (added TLS for pg)
})

export const db = drizzle(pool)
