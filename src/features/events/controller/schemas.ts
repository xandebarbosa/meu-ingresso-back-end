import { z } from 'zod';

export const schemaCreate = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    ticketsCount: z.number().int().positive(),
    image: z.string().default(''),
    date: z.string().min(3).max(255),
    location: z.object({
        name: z.string().min(3).max(255),
        address: z.string().min(3).max(255),
        city: z.string().min(3).max(255),
        country: z.string().min(2).max(2),
    }),
});

export const schemaUpdate = schemaCreate.partial();
