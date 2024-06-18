import { Router } from 'express';
import { route as coreRouter } from './core';

const router = Router();

router.use('/auth', coreRouter);

export { router };
