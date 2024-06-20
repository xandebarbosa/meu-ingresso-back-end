import { ObjectId, getDb } from '../../../services';
import { COLLECTION_EVENTS, EventsDocument, eventsSchema } from './schema';
import type { CreateEventParams } from './types';

const events = () => getDb().collection<EventsDocument>(COLLECTION_EVENTS);

export const createEvent = (data: CreateEventParams) =>
    events().insertOne(eventsSchema.parse(data) as EventsDocument);

export const getEventById = (id: string) =>
    events().findOne({ _id: new ObjectId(id) });

export const getEvents = () => events().find().toArray();

export const updateEventById = (id: string, data: CreateEventParams) =>
    events().updateOne({ _id: new ObjectId(id) }, { $set: data });
