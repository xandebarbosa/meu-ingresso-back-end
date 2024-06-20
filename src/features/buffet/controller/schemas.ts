import { z } from 'zod';

export const schemaCreate = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    price: z.number().min(0),
    available: z.boolean(),
    category: z.string().min(3).max(255),
});
