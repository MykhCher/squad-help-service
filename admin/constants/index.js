import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.HOST ?? 'localhost';
export const ADMIN_PORT = process.env.ADMIN_PORT ?? 2030; 

export const DB_NAME = process.env.DB_NAME; 
export const DB_PASS = process.env.DB_PASS; 
export const DB_USER = process.env.DB_USER; 
export const DB_PORT = process.env.DB_PORT; 
export const DB_HOST = process.env.DB_HOST; 

export const AUTH_SECRET = process.env.AUTH_SECRET