import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../lib/mongodb'
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === 'POST') {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        try {
            const newUser = new User({ name, email });
            await newUser.save();
            res.status(201).json({ message: 'User added successfully', data: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
