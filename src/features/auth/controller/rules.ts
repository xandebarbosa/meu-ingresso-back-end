import { nanoid } from 'nanoid';
import { NextFunction, Request, Response } from 'express';

import { APIResponse } from '../../../services';
import {
    schemaValidationForRequest,
    schemaValidationForToken,
} from './schemas';

export const validateBodyForRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'POST') {
        res.status(405).json({
            code: 'myTickets.api.profile.validateBodyForRequest.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        req.body = schemaValidationForRequest.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({
            code: 'myTickets.api.profile.validateBodyForRequest.failed',
            message: '',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};

export const validateBodyForToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'POST') {
        res.status(405).json({
            code: 'myTickets.api.profile.validateBodyForToken.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        req.body = schemaValidationForToken.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({
            code: 'myTickets.api.profile.validateBodyForToken.failed',
            message: '',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};
