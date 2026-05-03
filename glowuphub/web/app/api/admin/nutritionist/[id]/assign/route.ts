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

    // Role Check
    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });

    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EXPERT')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const userId = params.id;
        const body = await request.json();
        const { habits } = body; // Expects { habits: ["Habit 1", "Habit 2"] }

        if (!habits || !Array.isArray(habits)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Transaction: Create multiple habits
        // In a real app, we might want to archive old habits or deactivate them properly.
        // For now, we just append new habits.

        const createdHabits = await prisma.$transaction(
            habits.map((habitName: string) =>
                prisma.habit.create({
                    data: {
                        userId: userId,
                        trigger: "Assigned by Expert", // Generic trigger for now
                        action: habitName,
                        category: "Protocol",
                        frequency: "Daily",
                        isActive: true
                    }
                })
            )
        );

        return NextResponse.json({ success: true, count: createdHabits.length });

    } catch (error) {
        console.error("Protocol Assign API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
