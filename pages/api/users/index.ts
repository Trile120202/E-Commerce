import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === 'POST') {
        const { username, email, password, firstName, lastName, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        try {
            const newUser = new User({ username, email, password, firstName, lastName, role });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', data: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
