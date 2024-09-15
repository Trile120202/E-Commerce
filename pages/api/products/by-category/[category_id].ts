import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connectDB } from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import Image from '../../../../models/Image';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const { category_id } = req.query;

    if (req.method === 'GET') {
        try {
            const products = await Product.find({ category_id })
                .populate({
                    path: 'image_id',
                    select: 'imageBase64'
                })
                .populate('category_id');

            if (!products.length) {
                return res.status(404).json({ message: 'No products found for this category' });
            }

            res.status(200).json({ data: products });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products by category', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
