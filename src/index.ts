/// <reference path="./@types/express.d.ts" />
import 'dotenv/config';
import debug from 'debug';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { uniqueExecution } from '@nsfilho/unique';
import * as features from './features';
import './services';
import { app } from './services/express';

dayjs.extend(utc);
dayjs.extend(timezone);

const logger = debug('core');

logger('Starting API');

uniqueExecution({
    name: __filename,
    callback: () => {
        // the unique point of code who knows about all features
        app.use(features.events.controller.router);
        app.use(features.users.controller.router);
        app.use(features.tickets.controller.router);
        app.use(features.buffet.controller.router);
        app.use(features.webhook.controller.router);
        app.use(features.auth.controller.router);
    },
    advanced: {
        blockExecution: false,
        priority: 40,
        delay: 1000,
    },
});
