import { nanoid } from 'nanoid';
import { NextFunction, Request, Response } from 'express';

import { APIResponse } from '../../../services';
import {
    schemaValidationForLogin,
} from './schemas';


export const validateBodyForLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'POST') {
        res.status(405).json({
            code: 'airdrop.api.profile.validateBodyForLogin.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        req.body = schemaValidationForLogin.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({
            code: 'airdrop.api.profile.validateBodyForLogin.failed',
            message: '',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};
