import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Image  from '../../../models/Image';
import Banner from '../../../models/Banner';
import {Method} from "@/lib/common";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB().then(()=> console.log('Connect')).catch(()=> console.log('Connect error'));

    if (req.method === Method.GET) {
        try {
            const { tag } = req.query;
            let banners;
            if( tag === 'name'){
                banners = await Banner.find().select('name imageBase64');
            } else{
                banners = await Banner.find();
            }

            res.status(200).json({ data: banners });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching banners', error });
        }
    }
    else if (req.method===Method.POST){
        try {

        }catch (e) {
            res.status(500).json({ message: "Error fetching"})
        }

    }
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}



