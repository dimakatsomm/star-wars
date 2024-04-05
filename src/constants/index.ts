import 'dotenv/config';
import { env } from 'process';

export const PORT: number = Number(env.PORT || '3000');
export const MONGO_URI: string = env.MONGO_URI || '';
export const SALT_WORK_FACTOR: number = Number(env.SALT_WORK_FACTOR || '10');
export const JWT_SECRET_KEY: string = env.JWT_SECRET_KEY || '9WSlNZMcuquKDhiR';
export const JWT_LOGIN_EXPIRES_IN: string = env.JWT_LOGIN_EXPIRES_IN || '1h';
export const REDIS_PASSWORD: string = env.REDIS_PASSWORD || '';
export const REDIS_HOST: string = env.REDIS_HOST || 'http://127.0.0.1';
export const REDIS_PORT: number = Number(env.REDIS_PORT || '6380');
export const REDIS_TTL: number = 15 * 60;
