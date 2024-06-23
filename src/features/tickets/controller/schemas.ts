import { z } from 'zod';

export const schemaCreate = z.object({
    eventId: z.string(),
    price: z.number().min(0),
    userId: z.string(),
    qrcode: z.string(),
});

export const schemaUpdate = schemaCreate.partial();
