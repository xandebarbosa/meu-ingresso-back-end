import cors from 'cors';
import dayjs from 'dayjs';
import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import os from 'os';
import pkgJson from '../../../package.json';
import { EXPRESS_PORT } from '../../constants';
import { sendToExchange } from './queue';
import { APIEcho, APIResponse } from './types';

const logger = debug('services:express');

const app = express();

// trust proxy
app.set('trust proxy', true);

app.use(cors());
app.use(
    morgan('combined', {
        stream: {
            write: (message) => {
                logger(message.trim());
                sendToExchange(message);
            },
        },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.status(200).json({
        code: 'echo',
        transaction: nanoid(),
        message: 'OK',
        args: [],
        data: {
            server: os.hostname(),
            time: dayjs().toISOString(),
            version: pkgJson.version,
        },
    } as APIResponse<APIEcho>);
});

app.listen(EXPRESS_PORT, () => {
    logger(`Server listening on port ${EXPRESS_PORT}`);
});

export { APIEcho, APIResponse, app };
