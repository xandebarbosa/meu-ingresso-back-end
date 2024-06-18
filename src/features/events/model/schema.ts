import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_EVENTS = 'events';

export const eventsSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    ticketsCount: z.number().int().positive(),
    image: z.string(),
    date: z.string().min(3).max(255),
    location: z.object({
        name: z.string().min(3).max(255),
        address: z.string().min(3).max(255),
        city: z.string().min(3).max(255),
        country: z.string().min(2).max(2),
    }),
});

export type Events = z.infer<typeof eventsSchema>;
export type EventsDocument = Events & { _id: ObjectId | string };
