import multer from 'multer';
import {
    EXPRESS_MULTER_MAX_FILE_SIZE,
    TEMPORARY_DIRECTORY,
} from '../../constants';

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, TEMPORARY_DIRECTORY);
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: EXPRESS_MULTER_MAX_FILE_SIZE },
});
