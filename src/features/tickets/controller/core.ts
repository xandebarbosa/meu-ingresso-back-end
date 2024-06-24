import debug from 'debug';
import { nanoid } from 'nanoid';
import { Router } from 'express';
import * as model from '../model';
import * as modelEvent from '../../events/model';

import { validateBodyForCreate, validateBodyForUpdate } from './rules';
import { APIResponse } from '../../../services';
import { authenticate } from '../../middleware/authenticate';

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

route.post('/', authenticate, validateBodyForCreate, async (req, res) => {
    try {
        const { userId } = req.auth;
        const { eventId } = req.body;

        const event = await modelEvent.getEventById(eventId);

        if (!event) {
            res.status(404).json({
                code: 'myTickets.api.tickets.create.failed',
                message: 'event not found',
                transaction: nanoid(),
            } as APIResponse);

            return;
        }

        if (event.ticket.countAvailable === 0) {
            res.status(400).json({
                code: 'myTickets.api.tickets.create.failed',
                message: 'no tickets available',
                transaction: nanoid(),
            } as APIResponse);

            return;
        }

        // reservar o ticket para o usuario
        await model.reserveTicket({
            eventId,
            userId,
        });

        // dispatch para meio de pagamento

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
