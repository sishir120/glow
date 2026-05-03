import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

import { getMobileSession } from '@/lib/mobile-auth';

export async function GET(request: NextRequest) {
    const session = await auth() || await getMobileSession(request);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            logs: {
                orderBy: { date: 'desc' },
                take: 1
            }
        }
    });

    if (!user) {
        // If authenticated but not in DB (first login?), create profile
        // This is a fail-safe, ideally creation happens at registration
        return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Streak Logic check (simplified safe read-only for now, update moved to specific action if needed)
    // For performance, we might want to move write operations out of GET unless necessary.
    // Keeping existing logic but secured.
    if (user.logs && user.logs.length > 0) {
        const lastLog = user.logs[0];
        const lastDate = new Date(lastLog.date);
        lastDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays > 1 && user.streak > 0) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { streak: 0 },
                include: { logs: { orderBy: { date: 'desc' }, take: 1 } }
            });
        }
    }

    // Add subscription fields to response
    const userWithSubscription = {
        ...user,
        subscriptionTier: 'free',
        subscriptionExpiresAt: null,
        trialUsed: false,
        points: user.points ?? 0,
    };

    return NextResponse.json(userWithSubscription);
}

export async function PUT(request: NextRequest) {
    const session = await auth() || await getMobileSession(request);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { name, height, currentWeight, gender, activityLevel, goal, dietaryPref } = data;

        // Basic validation
        if (height && (isNaN(height) || height < 0 || height > 300)) return NextResponse.json({ error: 'Invalid height' }, { status: 400 });
        if (currentWeight && (isNaN(currentWeight) || currentWeight < 0 || currentWeight > 500)) return NextResponse.json({ error: 'Invalid weight' }, { status: 400 });

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name,
                height: height ? Number(height) : undefined,
                currentWeight: currentWeight ? Number(currentWeight) : undefined,
                gender,
                activityLevel,
                goal,
                dietaryPref,
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}

