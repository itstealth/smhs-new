import postgres from 'postgres';
const dbUrl = process.env.DATABASE_URL || '';
const ssl = dbUrl.includes('localhost') ? false : 'require';
export const sql = postgres(dbUrl, { ssl });
