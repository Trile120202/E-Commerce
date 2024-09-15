import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Product from '../../../models/Product';
import Image from '../../../models/Image';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, category_id, minPrice, maxPrice, sortBy, limit, page } = req.query;

    try {
        const query: any = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        if (category_id) {
            query.category_id = category_id;
        }

        if (minPrice && maxPrice) {
            query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        } else if (minPrice) {
            query.price = { $gte: Number(minPrice) };
        } else if (maxPrice) {
            query.price = { $lte: Number(maxPrice) };
        }

        let sortCondition: any = {};
        if (sortBy === 'price-asc') {
            sortCondition.price = 1;
        } else if (sortBy === 'price-desc') {
            sortCondition.price = -1;
        } else if (sortBy === 'name-asc') {
            sortCondition.name = 1;
        } else if (sortBy === 'name-desc') {
            sortCondition.name = -1;
        } else {
            sortCondition.createdAt = -1;
        }

        const limitValue = parseInt(limit as string) || 10;
        const pageValue = parseInt(page as string) || 1;
        const skip = (pageValue - 1) * limitValue;

        const products = await Product.find(query)
            .sort(sortCondition)
            .limit(limitValue)
            .skip(skip)
            .populate('category_id')
            .populate({
                path: 'image_id',
                select: 'imageBase64',
                model: 'Image',
            });

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            data: products,
            total: totalProducts,
            currentPage: pageValue,
            totalPages: Math.ceil(totalProducts / limitValue),
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
}
