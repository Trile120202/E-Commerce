import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Image from '../../../models/Image';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        const { tag } = req.query;
        let images;
        if( tag === 'name'){
            images = await Image.find().select('name');
        }else{
            images = await Image.find();
        }
        res.status(200).json({ data: images });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images', error });
    }
}
