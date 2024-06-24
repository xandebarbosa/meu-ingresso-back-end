import { Router, json } from 'express';
import { route as coreRouter } from './core';

const router = Router();

router.use((req, res, next): void => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        json()(req, res, next);
    }
});

router.use('/webhook', coreRouter);

export { router };
