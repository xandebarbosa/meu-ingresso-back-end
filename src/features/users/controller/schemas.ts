import { z } from 'zod';

export const schemaCreate = z.object({
    profile: z.object({
        name: z.string(),
        dateOfBirth: z.string(),
    }),
    access: z.object({
        email: z.string(),
        cellPhone: z.string(),
        code: z.string().default(''),
    }),
});

export const schemaUpdate = schemaCreate.partial();
