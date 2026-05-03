import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await auth();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Role Check: Only Experts/Admins can send messages from this route
    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, role: true }
    });

    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EXPERT')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const userId = params.id; // Receiver ID (Client)
        const body = await request.json();
        const { content } = body;

        if (!content || typeof content !== 'string') {
            return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
        }

        const message = await prisma.message.create({
            data: {
                content,
                senderId: currentUser.id,
                receiverId: userId,
            }
        });

        return NextResponse.json({ success: true, messageId: message.id });

    } catch (error) {
        console.error("Messaging API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
