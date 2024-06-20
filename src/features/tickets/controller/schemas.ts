import { z } from 'zod';

export const schemaCreate = z.object({
    eventId: z.string(),
});
