import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { productId, quantitySold } = req.body;

    if (!productId || !quantitySold) {
        return res.status(400).json({ message: 'Product ID and quantity sold are required' });
    }

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stock < quantitySold) {
            return res.status(400).json({ message: 'Not enough stock' });
        }

        product.stock -= quantitySold;
        product.sold += quantitySold;

        await product.save();

        res.status(200).json({ message: 'Sale processed successfully', product });
    } catch (error) {
        console.error('Error processing sale:', error);
        res.status(500).json({ message: 'Error processing sale', error });
    }
}
