import dayjs from 'dayjs';
import { ObjectId, getDb } from '../../../services';
import { COLLECTION_TICKETS, ticketsSchema } from './schema';
import type { ReserveTicketsParams, CreateTicketsParams } from './types';

const tickets = () => getDb().collection(COLLECTION_TICKETS);

export const reserveTicket = (data: ReserveTicketsParams) =>
    tickets().insertOne(
        ticketsSchema.parse({
            ...data,
            reservedAt: dayjs().add(10, 'minute').toDate(),
        })
    );

export const createTicket = (data: CreateTicketsParams) =>
    tickets().insertOne(ticketsSchema.parse(data));

export const getTicketsById = (id: string) =>
    tickets().findOne({ _id: new ObjectId(id) });

export const getTickets = () => tickets().find().toArray();

export const updateTicketsById = (id: string, data: CreateTicketsParams) =>
    tickets().updateOne({ _id: new ObjectId(id) }, { $set: data });
