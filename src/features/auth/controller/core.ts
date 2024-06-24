import debug from 'debug';
import { customAlphabet, nanoid } from 'nanoid';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { APIResponse } from '../../../services';
import { validateBodyForRequest, validateBodyForToken } from './rules';
import * as model from '../../users/model';
import { JWT_SECRETKEY } from '../../../constants';

const logger = debug('features:auth:controller');
const route = Router();

const customCode = customAlphabet('1234567890', 6);

route.post('/request', validateBodyForRequest, async (req, res) => {
    try {
        const { username } = req.body;

        const code = customCode();

        const user = await model.getUserByUsername(username);

        if (!user) throw new Error('User not found');

        await model.updateUserById(user._id.toString(), {
            'access.code': code,
        });

        console.log({
            username,
            code,
        });

        res.status(200).json({
            code: 'myTickets.api.auth.request.success',
            message: 'Request success',
            transaction: nanoid(),
            data: 'Code sent successfully',
        } as APIResponse<string>);
    } catch (error) {
        logger('Failed to request: %O', error);
        res.status(500).json({
            code: 'myTickets.api.auth.request.failed',
            message: `Request failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

route.post('/token', validateBodyForToken, async (req, res) => {
    try {
        const { username, code } = req.body;

        const user = await model.getUserByUsernameAndCode(username, code);

        if (!user) throw new Error('User not found');

        const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRETKEY);

        await model.updateUserById(user._id.toString(), {
            'access.code': null,
        });

        res.status(200).json({
            code: 'myTickets.api.auth.login.success',
            message: 'Login success',
            transaction: nanoid(),
            data: {
                user,
                token,
            },
        } as APIResponse<{
            user: model.UsersDocument;
            token: string;
        }>);
    } catch (error) {
        logger('Failed to login: %O', error);
        res.status(500).json({
            code: 'myTickets.api.auth.login.failed',
            message: `Login failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

export { route };
