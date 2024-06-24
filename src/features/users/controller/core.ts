import debug from 'debug';
import { nanoid } from 'nanoid';
import { Router } from 'express';
import * as model from '../model';

import { APIResponse } from '../../../services';
import { validateBodyForCreate, validateBodyForUpdate } from './rules';

const logger = debug('features:users:controller');
const route = Router();

route.get('/', async (req, res) => {
    try {
        const result = await model.getUsers();

        res.json({
            code: 'myTickets.api.users.list.success',
            message: 'list users success',
            transaction: nanoid(),
            data: result,
        } as APIResponse<model.UsersDocument[]>);
    } catch (error) {
        logger('Failed to list users: %O', error);
        res.status(500).json({
            code: 'myTickets.api.users.list.failed',
            message: `list users failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.post('/', validateBodyForCreate, async (req, res) => {
    try {
        await model.createUser(req.body);

        res.json({
            code: 'myTickets.api.users.create.success',
            message: 'create users success',
            transaction: nanoid(),
        } as APIResponse);
    } catch (error) {
        logger('Failed to create users: %O', error);
        res.status(500).json({
            code: 'myTickets.api.users.create.failed',
            message: `create users failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.put('/:id', validateBodyForUpdate, async (req, res) => {
    try {
        const { id } = req.params;
        await model.updateUserById(id, req.body);

        res.json({
            code: 'myTickets.api.users.update.success',
            message: 'users update success',
            transaction: nanoid(),
            data: true,
        } as APIResponse<boolean>);
    } catch (error) {
        logger('update users failed: %0', error);
        res.status(500).json({
            code: 'myTickets.api.users.update.failed',
            message: `users update failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

export { route };
