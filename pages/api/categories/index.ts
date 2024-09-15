import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Category from '../../../models/Category';
import Image  from '../../../models/Image';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB().then(() => console.log('Database connected')).catch(err => console.error('Connection error:', err));


    if (req.method === 'POST') {
        try {
            const data = req.body;

            if (Array.isArray(data)) {
                for (const categoryData of data) {
                    const { name, description, image_id } = categoryData;

                    if (!name || !image_id) {
                        console.log('Skipping entry due to missing name or image_id.');
                        continue;
                    }

                    const image = await Image.findById(image_id);

                    if (!image) {
                        console.log(`Image with ID ${image_id} not found. Skipping.`);
                        continue;
                    }

                    const existingCategory = await Category.findOne({ name, image_id });

                    if (!existingCategory) {
                        const newCategory = new Category({ name, description, image_id });
                        await newCategory.save();
                        console.log(`Created category: ${name}`);
                    } else {
                        console.log(`Category with name ${name} and image_id ${image_id} already exists.`);
                    }
                }

                res.status(201).json({ message: 'Categories processed' });
            } else {
                const { name, description, image_id } = data;

                if (!name || !image_id) {
                    return res.status(400).json({ message: 'Name and image_id are required' });
                }

                const image = await Image.findById(image_id);

                if (!image) {
                    return res.status(404).json({ message: `Image with ID ${image_id} not found` });
                }

                const existingCategory = await Category.findOne({ name, image_id });

                if (!existingCategory) {
                    const newCategory = new Category({ name, description, image_id });
                    await newCategory.save();
                    return res.status(201).json({ message: 'Category created', data: newCategory });
                } else {
                    return res.status(409).json({ message: `Category with name ${name} and image_id ${image_id} already exists` });
                }
            }
        } catch (error) {
            console.error('Error creating categories:', error);
            res.status(500).json({ message: 'Error creating categories', error });
        }

    } else if (req.method === 'GET') {
        try {
            const { tag } = req.query;
            let categories;
            if( tag === 'name'){
                categories = await Category.find().select('name image_id');
            } else{
                categories = await Category.find();
             categories = await Category.find({}).populate({
                path: 'image_id',
                select: 'imageBase64',
                model: 'Image',
            });
            }


            res.status(200).json({ data: categories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching categories', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
