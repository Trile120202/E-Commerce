import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
    userId: string;
    role: string;
}

export const authenticateAdmin = async (req: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { status: 401, message: 'No token provided' };
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return { status: 401, message: 'No token provided' , authHeader};
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
        if (decoded.role !== 'admin') {
            return { status: 403, message: 'Access denied' };
        }
        return { status: 200, userId: decoded.userId };
    } catch (error) {
        return { status: 401, message: error,authHeader:"Invalid"};
    }
};
