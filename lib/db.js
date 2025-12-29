import { Pool } from "pg";

const globalForPg = globalThis;

export const pool =
  globalForPg.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool;

export function query(text, params) {
  return pool.query(text, params);
}
