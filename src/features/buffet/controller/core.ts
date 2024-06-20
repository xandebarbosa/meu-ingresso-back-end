import debug from 'debug';
import { nanoid } from 'nanoid';
import { Router } from 'express';
import * as model from '../model';
import { validateBodyForCreate } from './rules';
import { APIResponse } from '../../../services';

const logger = debug('features:buffet:controller');
const route = Router();

route.get('/', async (req, res) => {
    try {
        const result = await model.getBuffets();

        res.json({
            code: 'myTickets.api.buffet.list.success',
            message: 'list buffet success',
            transaction: nanoid(),
            data: result,
        } as APIResponse<model.BuffetDocument[]>);
    } catch (error) {
        logger('Failed to list buffet: %O', error);
        res.status(500).json({
            code: 'myTickets.api.buffet.list.failed',
            message: `list buffet failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.post('/', validateBodyForCreate, async (req, res) => {
    try {
        await model.createBuffet(req.body);

        res.json({
            code: 'myTickets.api.buffet.create.success',
            message: 'buffet create success',
            transaction: nanoid(),
            data: true,
        } as APIResponse<boolean>);
    } catch (error) {
        logger('create buffet failed: %O', error);
        res.status(500).json({
            code: 'myTickets.api.buffet.create.failed',
            message: `buffet create failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

export { route };
