import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET() {
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
        // 2. Fetch "At Risk" or "High Priority" Clients
        // Logic: Clients who haven't logged in 3 days, or have low mood average.

        // Mocking the complex query for now:
        // Find clients assigned to this expert (if we have expertId in session)
        // For admin, find all.

        const atRiskClients = await prisma.user.findMany({
            where: {
                // Example: No logs in last 3 days
                // logs: { none: { date: { gte: threeDaysAgo } } }
                // For now, just return latest 5 clients
            },
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                currentPhase: true,
                userHabitLogs: { // accessing the relation properly?
                    // Wait, relation name in schema was default or explicit?
                    // `logs` in User model refers to `DailyLog`.
                    // `habits` -> `Habit` -> `logs` (HabitLog).
                    // We need to aggregate across habits.
                }
            }
        });

        // We need to refine the query based on the schema I defined.
        // User has `logs` (DailyLog) and `habits` (Habit).

        const clients = await prisma.user.findMany({
            take: 10,
            include: {
                logs: {
                    orderBy: { date: 'desc' },
                    take: 1
                }
            }
        });

        // Formatting for Dashboard
        const dashboardData = clients.map(client => ({
            id: client.id,
            name: client.name || "Unknown",
            email: client.email,
            currentPhase: client.currentPhase || "ADAPTING",
            logs: client.logs // Pass logs to be processed
        }));

        const finalData = dashboardData.map(c => ({
            id: c.id,
            name: c.name,
            phase: c.currentPhase,
            lastLog: c.logs[0]?.date || null, // Allow null
            // Infer status: If last log was > 3 days ago OR glowScore < 50 => Concern
            status: (!c.logs[0] ||
                (new Date().getTime() - new Date(c.logs[0].date).getTime()) > 3 * 24 * 60 * 60 * 1000 ||
                c.logs[0].glowScore < 50
            ) ? "Concern" : "Stable"
        }));

        return NextResponse.json({ clients: finalData });

    } catch (error) {
        console.error("Nutritionist API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
