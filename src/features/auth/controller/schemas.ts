import { z } from 'zod';

export const schemaValidationForRequest = z.object({
    username: z.string(),
});

export const schemaValidationForToken = z.object({
    username: z.string(),
    code: z.string(),
});
