import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding psychology content...')

    // 1. Seed Identity Statements / Categories?
    // Actually, IdentityStatements are per user. 
    // We can seed Global Rituals.

    await prisma.dailyRitual.createMany({
        data: [
            {
                type: "Morning",
                content: "Identity Shift: You are not 'trying' to be healthy. You ARE a healthy person making choices that align with your nature.",
                requiredPhase: "ADAPTING",
                requiredMood: "Low Energy" // Target low energy
            },
            {
                type: "Morning",
                content: "Consistency over Intensity. Showing up for 5 minutes is better than ghosting for 5 days.",
                requiredPhase: "ADAPTING"
            },
            {
                type: "Evening",
                content: "Reflect: What is one small piece of evidence you created today that proves you are changing?",
                requiredPhase: "ADAPTING"
            },
            {
                type: "Morning",
                content: "You have built momentum. Now, protect it. Validating your progress is key.",
                requiredPhase: "STABILIZING"
            }
        ]
    })

    // 2. Seed Testimonials
    await prisma.testimonial.createMany({
        data: [
            {
                content: "I realized I didn't need to be perfect. The 80/20 rule saved my sanity.",
                author: "Jessica, 34",
                tags: "Mindset"
            },
            {
                content: "The daily rituals shifted how I view food. It's fuel, not a reward or punishment.",
                author: "Alana, 29",
                tags: "Nutrition"
            }
        ]
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
