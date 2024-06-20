import { MatchKeysAndValues } from 'mongodb';
import { ObjectId, getDb } from '../../../services';
import { COLLECTION_USERS, usersSchema, UsersDocument } from './schema';
import type { CreateUserParams } from './types';

const users = () => getDb().collection<UsersDocument>(COLLECTION_USERS);

export const createUser = (data: CreateUserParams) =>
    users().insertOne(usersSchema.parse(data) as UsersDocument);

export const getUserById = (id: string) =>
    users().findOne({ _id: new ObjectId(id) });

export const getUserByUsername = (username: string) =>
    users().findOne({
        $or: [{ 'access.email': username }, { 'access.cellPhone': username }],
    });

export const getUserByUsernameAndCode = (username: string, code: string) =>
    users().findOne({
        $or: [{ 'access.email': username }, { 'access.cellPhone': username }],
        'access.code': code,
    });

export const getUsers = () => users().find().toArray();

export const updateUserById = (
    id: string,
    data: MatchKeysAndValues<UsersDocument>
) => users().updateOne({ _id: new ObjectId(id) }, { $set: data });
