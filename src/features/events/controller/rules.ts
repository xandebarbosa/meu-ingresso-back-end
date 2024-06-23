import { nanoid } from 'nanoid';
import { NextFunction, Request, Response } from 'express';

import { APIResponse } from '../../../services';
import { schemaCreate, schemaUpdate } from './schemas';

export const validateBodyForCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'POST') {
        res.status(405).json({
            code: 'myTickets.api.profile.validateBodyForCreate.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        req.body = schemaCreate.parse(req.body);

        next();
    } catch (error: Error | any) {
        res.status(400).json({
            code: 'myTickets.api.profile.validateBodyForCreate.failed',
            message: error?.message,
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};

export const validateBodyForUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'PUT') {
        res.status(405).json({
            code: 'airdrop.api.profile.validateBodyForUpdate.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        req.body = schemaUpdate.parse(req.body);

        next();
    } catch (error: Error | any) {
        res.status(400).json({
            code: 'airdrop.api.profile.validateBodyForUpdate.failed',
            message: error?.message,
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};
