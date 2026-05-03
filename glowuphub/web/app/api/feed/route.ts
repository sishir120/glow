import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    const session = await auth();

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const userId = session.user.id;

        // 1. Fetch User's Psychology Profile & Context
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                identityStatements: true,
                habits: {
                    where: { isActive: true },
                    include: {
                        logs: {
                            where: {
                                date: {
                                    gte: new Date(new Date().setHours(0, 0, 0, 0)), // Today's logs
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 2. Determine "Daily Ritual" Content
        // Logic: If mood was low yesterday (we'd need to fetch yesterday's log), give motivational.
        // For now, random or based on phase.
        const phase = user.currentPhase || "ADAPTING";

        // Fetch a ritual suitable for the phase/time
        // In production, this would be a sophisticated query or AI generation.
        // Fallback content:
        let dailyRitual = {
            type: "Morning",
            content: "Today is about showing up. You don't need to be perfect, you just need to be present.",
            tags: ["Consistency", "Identity"]
        };

        // Try to find a DB ritual
        const dbRitual = await prisma.dailyRitual.findFirst({
            where: { requiredPhase: phase },
            orderBy: { id: 'desc' }, // Latest or Random
        });

        if (dbRitual) {
            dailyRitual = {
                type: dbRitual.type,
                content: dbRitual.content,
                tags: [phase]
            };
        }

        // 3. Construct "Smart Feed" Payload
        const feed = {
            greeting: `Good morning, ${user.name?.split(' ')[0] || 'Glower'}`,
            phase: phase,
            identityFocus: user.identityStatements[0]?.statement || "I am becoming the best version of myself.",
            ritual: dailyRitual,
            habits: user.habits.map(h => ({
                ...h,
                isCompletedToday: h.logs.length > 0,
                streak: 0 // Todo: Calculate streak
            })),
            // 4. Inject "Micro-Evidence" (Testimonial)
            testimonial: {
                quote: "I didn't believe I could change until I started tracking the small wins.",
                author: "Community Member"
            }
        };

        return NextResponse.json(feed);

    } catch (error) {
        console.error("Feed API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
