import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // In a real app, we'd fetch the user's assigned plan from the DB
        // For now, we'll return a structured plan based on their profile data
        // but served via an API to enable dynamic FE logic.

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { name: true, currentWeight: true, goal: true }
        });

        // Dynamic plan logic based on user profile
        const plan = {
            name: user?.goal === "LOSS" ? "Sustainable Weight Loss" : "Metabolic Optimization",
            description: `Personalized plan designed to help you reach your goals safely and sustainably.`,
            assignedBy: "Sabita Subedi (Chief Nutritionist)",
            assignedDate: "Jan 10, 2026",
            macros: {
                calories: user?.currentWeight ? Math.round(user.currentWeight * 26) : 2000,
                protein: user?.currentWeight ? Math.round(user.currentWeight * 2.0) : 150,
                carbs: user?.currentWeight ? Math.round(user.currentWeight * 2.5) : 200,
                fat: user?.currentWeight ? Math.round(user.currentWeight * 0.7) : 60
            },
            notes: "Prioritize whole foods and consistent meal timing. Protein is your metabolic foundation—never skip it.",
            features: [
                "Biometric-linked nutrient scaling",
                "Metabolic pathway support",
                "Advanced glucose management",
                "Chief Nutritionist oversight"
            ]
        };

        return NextResponse.json(plan);
    } catch (error) {
        console.error("API Error [Plan]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
