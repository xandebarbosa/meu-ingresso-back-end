import { ObjectId, getDb } from '../../../services';
import { COLLECTION_BUFFET, buffetSchema } from './schema';
import type { CreateBuffetParams } from './types';

const buffet = () => getDb().collection(COLLECTION_BUFFET);

export const createBuffet = (data: CreateBuffetParams) =>
    buffet().insertOne(buffetSchema.parse(data));

export const getBuffetById = (id: string) =>
    buffet().findOne({ _id: new ObjectId(id) });

export const getBuffets = () => buffet().find().toArray();

export const updateBuffetById = (id: string, data: CreateBuffetParams) =>
    buffet().updateOne({ _id: new ObjectId(id) }, { $set: data });
