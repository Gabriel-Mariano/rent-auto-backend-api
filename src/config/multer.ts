import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const multerConfig = {
    dest:path.resolve(__dirname,'..','..','tmp','uploads'),
    storage:multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname,'..','..','tmp','uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) console.log(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            })
        }
    }),
    
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else {
            cb(new Error('Arquivo de imagem inválido'));
        }
    }
}

export default multerConfig;

