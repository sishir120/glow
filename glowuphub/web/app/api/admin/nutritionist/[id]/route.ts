import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await auth();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Security Hardening: Check Role
    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });

    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EXPERT')) {
        return NextResponse.json({ error: 'Forbidden: Experts Only' }, { status: 403 });
    }

    try {
        const userId = params.id;

        const client = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                identityStatements: true,
                habits: {
                    include: {
                        logs: {
                            orderBy: { date: 'desc' },
                            take: 5
                        }
                    }
                },
                logs: { // This is DailyLog
                    orderBy: { date: 'desc' },
                    take: 7
                }
            }
        });

        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        // Aggregate Habit Logs for "Recent Logs" view (flattening)
        // We want a chronicle of activity. 
        // For now, let's just show DailyLogs as the primary "Log" source for the chart/history
        // And use Habits for the "Protocol" section.

        // Transform data for the frontend
        const detailData = {
            id: client.id,
            name: client.name || "Unknown",
            email: client.email,
            phase: client.currentPhase || "ADAPTING",
            joined: client.createdAt,
            psychProfile: client.psychProfile ? JSON.parse(client.psychProfile) : { drive: "Unknown", barriers: [] },
            currentGoals: client.habits.filter(h => h.isActive).map(h => h.action),
            recentLogs: client.logs.map(l => ({
                date: l.date,
                // DailyLog doesn't have mood/notes directly in the same way, 
                // but let's map 'glowScore' or similar if needed.
                // Wait, DailyLog has 'completedHabits', 'weight', etc.
                // HabitLog has 'mood' & 'notes'.

                // Let's rely on the HabitLogs for the specific "Mood" history if possible.
                // But accessing them is nested.

                // FALLBACK: Use DailyLog for structure, and maybe mock mood for now 
                // OR fetch HabitLogs directly if we want a "Feed of events".

                // Let's stick to DailyLog for the graph representation for now.
                mood: l.glowScore > 80 ? 5 : l.glowScore > 50 ? 3 : 1, // Inference
                notes: `Steps: ${l.steps || 0}, Sleep: ${l.sleep || 0}h`
            }))
        };

        return NextResponse.json({ client: detailData });

    } catch (error) {
        console.error("Client Detail API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
