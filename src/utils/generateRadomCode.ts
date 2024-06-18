import { customAlphabet } from 'nanoid';

const randomCode = customAlphabet(
    'ABCDEFGHKMNPRSTUVWXYZabcdefghkmnprstuvwxyz0123456789'
);

interface GenerateRadomCodeParams {
    length: number;
}

export const generateRadomCode = (
    { length }: GenerateRadomCodeParams = {
        length: 7,
    }
) => randomCode(length);
