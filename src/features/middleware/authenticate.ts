import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { JWT_SECRETKEY } from '../../constants';
import { APIResponse } from '../../services';

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({
            code: 'myTickets.api.auth.token.missing',
            message: 'Token is missing',
            transaction: nanoid(),
            data: {},
        } as APIResponse);

        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRETKEY);
        req.auth = { wallet: (decoded as any).auth.wallet };
        next();
    } catch (error) {
        res.status(401).json({
            code: 'myTickets.api.auth.token.invalid',
            message: 'Token is invalid',
            transaction: nanoid(),
            data: {},
        } as APIResponse);
    }
};
