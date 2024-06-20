import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_TICKETS = 'tickets';

export const ticketsSchema = z.object({
    price: z.number().min(0),
    eventId: z.string(),
    userId: z.string(),
    qrcode: z.string(),
});

export type Ticket = z.infer<typeof ticketsSchema>;
export type TicketDocument = Ticket & { _id: ObjectId | string };
