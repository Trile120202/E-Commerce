import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import mongoose from 'mongoose';
import { connectDB } from '../../lib/mongodb';
// @ts-ignore
import { IncomingForm } from 'formidable';
import Image from '../../models/Image'
declare module 'next' {
    export interface NextApiRequest extends IncomingForm {
        file?: Express.Multer.File;
    }
}
connectDB();



const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        upload.single('file')(req as any, res as any, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error uploading file', error: err });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            try {
                const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

                const newImage = new Image({
                    name: req.body.name || 'Unnamed Image',
                    imageBase64
                });

                await newImage.save();

                res.status(201).json({ message: 'File uploaded and saved successfully', data: newImage });
            } catch (error) {
                res.status(500).json({ message: 'Error processing file', error });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;
