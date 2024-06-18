export const NODE_ENV = process.env.NODE_ENV || 'dev';
export const JWT_SECRETKEY = process.env.JWT_SECRETKEY || 'jwt_secretkey';
export const API_BASE = process.env.API_BASE || 'http://localhost:3000';
export const TEMPORARY_DIRECTORY =
    process.env.TEMPORARY_DIRECTORY || 'uploads/';

export * from './express';
export * from './sentry';
export * from './mongo';
export * from './rabbitmq';
