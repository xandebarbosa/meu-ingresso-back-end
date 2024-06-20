import { ObjectId, getDb } from '../../../services';
import { COLLECTION_TICKETS, ticketsSchema } from './schema';
import type { CreateTicketsParams } from './types';

const tickets = () => getDb().collection(COLLECTION_TICKETS);

export const createTickets = (data: CreateTicketsParams) =>
    tickets().insertOne(ticketsSchema.parse(data));

export const getTicketsById = (id: string) =>
    tickets().findOne({ _id: new ObjectId(id) });

export const getTickets = () => tickets().find().toArray();

export const updateTicketsById = (id: string, data: CreateTicketsParams) =>
    tickets().updateOne({ _id: new ObjectId(id) }, { $set: data });
