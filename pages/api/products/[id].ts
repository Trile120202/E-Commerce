import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const product = await Product.findById(id)
                .populate('category_id')
                .populate({
                    path: 'image_id',
                    select: 'imageBase64',
                    model: 'Image',
                })
                .populate({
                    path: 'image_ids',
                    select: 'imageBase64',
                    model: 'Image',
                });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ data: product });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    } else if (req.method === 'PUT') {
        const { name, price, category_id, description, image_ids, stock } = req.body; // Make sure to update `image_ids`
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, price, category_id, description, image_ids, stock }, // Include `image_ids` here
                { new: true }
            ).populate('category_id')
                .populate({
                    path: 'image_ids',
                    select: 'imageBase64 name',
                });

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated', data: updatedProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    } else if (req.method === 'DELETE') {
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted', data: deletedProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
