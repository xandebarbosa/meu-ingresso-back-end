import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_BUFFET = 'buffet';

export const buffetSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(0),
    available: z.boolean(),
    category: z.string(),
});

export type Buffet = z.infer<typeof buffetSchema>;
export type BuffetDocument = Buffet & { _id: ObjectId | string };
