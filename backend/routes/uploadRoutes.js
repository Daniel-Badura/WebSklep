import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticator, isAdmin } from '../middleware/authMiddleware.js';
import File from '../models/fileModel.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', authenticator, isAdmin, upload.single('image'), async (req, res) => {
    // res.send(`/${req.file.path}`);
    try {
        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
        });
        await file.save();
        res.status(201).json({ message: 'File uploaded successfully', path: path });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;