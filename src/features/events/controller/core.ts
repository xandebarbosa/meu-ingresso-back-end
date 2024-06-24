import debug from 'debug';
import { nanoid } from 'nanoid';
import { Router } from 'express';
import * as model from '../model';
import { validateBodyForCreate, validateBodyForUpdate } from './rules';
import { APIResponse } from '../../../services';

const logger = debug('features:events:controller');
const route = Router();

route.get('/', async (req, res) => {
    try {
        const result = await model.getEvents();

        res.json({
            code: 'myTickets.api.events.list.success',
            message: 'list events success',
            transaction: nanoid(),
            data: result,
        } as APIResponse<model.EventsDocument[]>);
    } catch (error) {
        logger('Failed to list events: %O', error);
        res.status(500).json({
            code: 'myTickets.api.events.list.failed',
            message: `list events failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.post('/', validateBodyForCreate, async (req, res) => {
    try {
        await model.createEvent(req.body);

        res.json({
            code: 'myTickets.api.events.create.success',
            message: 'events create success',
            transaction: nanoid(),
            data: true,
        } as APIResponse<boolean>);
    } catch (error) {
        logger('create events failed: %O', error);
        res.status(500).json({
            code: 'myTickets.api.events.create.failed',
            message: `events create failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.put('/:id', validateBodyForUpdate, async (req, res) => {
    try {
        const { id } = req.params;
        await model.updateEventById(id, req.body);

        res.json({
            code: 'myTickets.api.events.update.success',
            message: 'events update success',
            transaction: nanoid(),
            data: true,
        } as APIResponse<boolean>);
    } catch (error) {
        logger('update events failed: %0', error);
        res.status(500).json({
            code: 'myTickets.api.events.update.failed',
            message: `events update failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

export { route };
