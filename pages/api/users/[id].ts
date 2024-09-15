import type {NextApiRequest, NextApiResponse} from 'next';
import {connectDB} from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const {id} = req.query;

    if (req.method === 'GET') {
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            res.status(200).json({data: user});
        } catch (error) {
            res.status(500).json({message: 'Error fetching user', error});
        }
    } else if (req.method === 'PUT') {
        const {username, email, password, firstName, lastName, role} = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                {username, email, password, firstName, lastName, role},
                {new: true}
            );
            if (!updatedUser) {
                return res.status(404).json({message: 'User not found'});
            }
            res.status(200).json({message: 'User updated successfully', data: updatedUser});
        } catch (error) {
            res.status(500).json({message: 'Error updating user', error});
        }
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}
