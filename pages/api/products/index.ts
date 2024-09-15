import type {NextApiRequest, NextApiResponse} from 'next';
import {connectDB} from '../../../lib/mongodb';
import Product from '../../../models/Product';
import {authenticateAdmin} from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === 'POST') {
        const authResult = await authenticateAdmin(req);
        if (authResult.status !== 200) {
            return res.status(authResult.status).json({message: authResult.message});
        }
        const {name, price, category_id, description, image_id, image_ids, stock} = req.body;
        if (!name || !price || !category_id) {
            return res.status(400).json({message: 'Missing required fields'});
        }
        if (image_ids) {
            if (!Array.isArray(image_ids)) {
                return res.status(400).json({message: 'Missing required fields'});

            }
        }
        try {
            const newProduct = new Product({name, price, category_id, description, image_id, image_ids, stock});
            await newProduct.save();
            res.status(201).json({message: 'Product created', data: newProduct});
        } catch (error) {
            res.status(500).json({message: 'Error creating product', error});
        }
    } else if (req.method === 'GET') {
        try {
            const products = await Product.find({}).populate('category_id');
            res.status(200).json({data: products});
        } catch (error) {
            res.status(500).json({message: 'Error fetching products', error});
        }
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}
