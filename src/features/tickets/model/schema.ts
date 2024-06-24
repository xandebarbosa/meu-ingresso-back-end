import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_TICKETS = 'tickets';

export const ticketsSchema = z.object({
    eventId: z.string(),
    userId: z.string(),
    qrcode: z.string().nullable().default(null), // so depois que o pagamento for aprovado
    reservedAt: z.date().nullable().default(null),
    paidAt: z.date().nullable().default(null),
});

export type Ticket = z.infer<typeof ticketsSchema>;
export type TicketDocument = Ticket & { _id: ObjectId | string };
