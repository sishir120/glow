import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const session = await auth();

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { habitId, completed, mood, notes } = body;

        if (!habitId) {
            return NextResponse.json({ error: 'Missing habitId' }, { status: 400 });
        }

        // 1. Log the Habit
        const log = await prisma.habitLog.create({
            data: {
                habitId,
                completed: !!completed,
                mood: mood ? parseInt(mood) : null,
                notes: notes || undefined,
                date: new Date(),
            },
        });

        // 2. Psychology: Reinforce Identity (Gamification)
        // If completed, increase strength of associated IdentityStatement (if we linked them).
        // For now, we just acknowledge.

        // Future: Find habit -> find linked Identity -> increment strength.

        return NextResponse.json({
            success: true,
            log,
            message: "Micro-evidence recorded. You are becoming who you want to be."
        });

    } catch (error) {
        console.error("Habit Log API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
