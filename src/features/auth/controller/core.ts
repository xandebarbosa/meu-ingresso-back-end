import debug from 'debug';
import { nanoid } from 'nanoid';
import { Router } from 'express';
import { APIResponse } from '../../../services';
import { validateBodyForLogin } from './rules';
import { AuthLoginResponse } from './types';

const logger = debug('features:auth:controller');
const route = Router();

route.post('/token', validateBodyForLogin, async (req, res) => {
    try {
        res.status(200).json({
            code: 'airdrop.api.auth.login.success',
            message: 'Login success',
            transaction: nanoid(),
            data: {},
        } as APIResponse<AuthLoginResponse>);
    } catch (error) {
        logger('Failed to login: %O', error);
        res.status(500).json({
            code: 'airdrop.api.auth.login.failed',
            message: `Login failed: ${error}`,
            args: error,
            transaction: nanoid(),
        } as APIResponse);
    }
});

export { route };
