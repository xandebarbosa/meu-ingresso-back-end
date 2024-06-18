export const EXPRESS_PORT = process.env.EXPRESS_PORT
    ? parseInt(process.env.EXPRESS_PORT, 10)
    : 3000;

export const EXPRESS_MULTER_MAX_FILE_SIZE = process.env
    .EXPRESS_MULTER_MAX_FILE_SIZE
    ? parseInt(process.env.EXPRESS_MULTER_MAX_FILE_SIZE, 10)
    : 1024 * 1024 * 10;
