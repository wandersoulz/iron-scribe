import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Connects to the Supabase Transaction Pooler (port 6543)
const isProduction = process.env.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: isProduction ? { rejectUnauthorized: false } : undefined
});