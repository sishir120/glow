import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export async function getMobileSession(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

    try {
        const { payload } = await jwtVerify(token, secret);
        return {
            user: {
                id: payload.sub as string,
                email: payload.email as string,
                name: payload.name as string,
                image: payload.picture as string,
                role: payload.role as string,
            }
        };
    } catch (error) {
        console.error('Mobile token verification failed:', error);
        return null;
    }
}
