import { z } from 'zod';


export const schemaValidationForLogin = z.object({
    cellPhone: z.string()
});
