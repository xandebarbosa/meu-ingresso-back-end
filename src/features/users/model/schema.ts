import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_USERS = 'users';

export const usersSchema = z.object({
    profile: z.object({
        name: z.string(),
        dateOfBirth: z.string(),
    }),
    access: z.object({
        email: z.string(),
        cellPhone: z.string(),
        code: z.string().default(''),
    }),
    wallet: z
        .object({
            balance: z.number(),
        })
        .default({ balance: 0 }),
    orders: z
        .array(
            z.object({
                eventId: z.string(),
                buffetId: z.string(),
                quantity: z.number(),
            })
        )
        .default([]),
});

export type Users = z.infer<typeof usersSchema>;
export type UsersDocument = Users & { _id: ObjectId | string };
