import debug from 'debug';
import { nanoid } from 'nanoid';
import { Router } from 'express';
import * as model from '../model';
import { validateBodyForCreate, validateBodyForUpdate } from './rules';
import { APIResponse } from '../../../services';

const logger = debug('features:tickets:controller');
const route = Router();

route.get('/', async (req, res) => {
    try {
        const result = await model.getTickets();

        res.json({
            code: 'myTickets.api.tickets.list.success',
            message: 'list tickets success',
            transaction: nanoid(),
            data: result,
        } as APIResponse<model.TicketDocument[]>);
    } catch (error) {
        logger('Failed to list tickets: %O', error);
        res.status(500).json({
            code: 'myTickets.api.tickets.list.failed',
            message: `list tickets failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.post('/', validateBodyForCreate, async (req, res) => {
    try {
        await model.createTickets(req.body);

        res.json({
            code: 'myTickets.api.tickets.create.success',
            message: 'tickets create success',
            transaction: nanoid(),
            data: true,
        } as APIResponse<boolean>);
    } catch (error) {
        logger('create tickets failed: %O', error);
        res.status(500).json({
            code: 'myTickets.api.tickets.create.failed',
            message: `tickets create failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.put('/:id', validateBodyForUpdate, async (req, res) => {
    try {
        const { id } = req.params;
        await model.updateTicketsById(id, req.body);

        res.json({
            code: 'myTickets.api.tickets.update.sucess',
            message: 'tickets update success',
            transaction: nanoid(),
            data: true,
        } as APIResponse<boolean>);
    } catch (error) {
        logger('update tickets failed: %0', error);
        res.status(500).json({
            code: 'myTickets.api.tickets.update.failed',
            message: `tickets update failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

export { route };
