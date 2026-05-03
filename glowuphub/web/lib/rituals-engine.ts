import { calculateBMR, calculateTDEE, getCalorieTarget, calculateMacros, calculateHydration, calculateBMI } from './calculations';

export interface Routine {
    id: string;
    title: string;
    duration: string;
    category: string;
    description: string;
    steps: (string | { title: string; image: string; description?: string })[];
    type: 'check' | 'timer' | 'breath';
    videoColor: string;
    timerDuration?: number;
    nutrition?: { cals: number; protein: number; water?: number };
    personalizationNote?: string;
    scientificRationale?: string;
    citations?: string[];
}

export function generatePersonalizedRoutines(user: any): Routine[] {
    if (!user) return [];

    const weight = user.currentWeight;
    const height = user.height;
    const age = user.age || 30;
    const gender = user.gender || 'F';
    const goal = user.goal || 'LOSS';
    const streak = user.streak || 0;
    const activity = user.activityLevel || 'MODERATE';

    // 1. Calculate Core Targets
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activity);
    const calorieTarget = getCalorieTarget(tdee, goal);
    const macros = calculateMacros(calorieTarget, weight, goal);
    const hydration = calculateHydration(weight, activity);
    const bmi = calculateBMI(weight, height);

    // 2. Progression Multiplier (0.5% increase per streak day, max 25%)
    const progressionFactor = Math.min(1 + (streak * 0.005), 1.25);

    // 3. Nutrition Routines (Morning/Evening)
    // Targeting ~20% of calories and ~30% of protein at breakfast for muscle protein synthesis signals
    const morningCalorieTarget = Math.round(calorieTarget * 0.2);
    let morningProteinTarget = Math.round(macros.protein * 0.3);

    // Biological Safety: Ensure protein calories don't exceed meal calories
    if (morningProteinTarget * 4 > morningCalorieTarget * 0.9) {
        // If protein is too high for the calorie allotment, adjust targets to be physically possible
        // We prioritize protein but cap it at 90% of the meal's energy
        morningProteinTarget = Math.floor((morningCalorieTarget * 0.8) / 4);
    }

    const routines: Routine[] = [
        {
            id: 'protein-anchor-morning',
            title: 'High-Protein Breakfast',
            duration: '15 min',
            category: 'morning',
            videoColor: 'bg-emerald-500/10',
            description: `A precision-engineered protocol designed to synchronize your metabolism and provide a neuro-protein anchor for the day.`,
            steps: [
                { title: 'Neural Hydration', image: '/exercises/sit-tall.png', description: `Consume 500ml of mineralized water to activate cellular pathways.` },
                { title: 'Protein Signal', image: '/exercises/sit-tall.png', description: `Administer a meal with ${morningProteinTarget}g of high-bioavailability protein.` },
                { title: 'Fibrous Substrate', image: '/exercises/sit-tall.png', description: `Integrate 5-8g of slow-fermenting fiber for sustained glycemic stability.` }
            ],
            type: 'check',
            nutrition: { cals: morningCalorieTarget, protein: morningProteinTarget },
            personalizationNote: `Calibrated specifically for your ${weight}kg mass and metabolic objectives.`
        },
        {
            id: 'metabolic-priming-mobility',
            title: 'Bio-Mechanical Priming',
            duration: `${Math.round(5 * progressionFactor)} min`,
            category: 'warmup',
            videoColor: 'bg-amber-500/10',
            description: `Sequenced mobility to optimize joint lubrication and neural recruitment for the diurnal cycle.`,
            steps: [
                { title: 'Axial Decompression', image: '/exercises/sit-tall.png', description: `Release spinal tension through controlled multi-planar movement.` },
                { title: 'Pelvic Calibration', image: '/exercises/sit-tall.png', description: `Optimize hip articulation for efficient kinetic chain function.` },
                { title: 'Humeral Rotation', image: '/exercises/sit-tall.png', description: `Standardize shoulder-girdle mobility for postural integrity.` }
            ],
            type: 'timer',
            timerDuration: Math.round(300 * progressionFactor),
            personalizationNote: `Intensity escalated by ${Math.round((progressionFactor - 1) * 100)}% based on your ${streak}-day consistency.`
        }
    ];

    // BMI Based Physical Discipline
    if (bmi > 30) {
        routines.push({
            id: 'steady-state-neats',
            title: 'Active Living (Step Up)',
            duration: '20 min',
            category: 'body',
            videoColor: 'bg-sage/20',
            description: `Easy, steady activity like walking to keep your metabolism active without straining your joints.`,
            steps: [
                'Walk at a comfortable pace where you can still hold a conversation.',
                'Focus on taking deep, relaxing breaths through your nose.',
                'Keep your back straight and your core slightly tight for support.'
            ],
            type: 'check',
            personalizationNote: `We chose this low-impact activity specifically for your body type.`
        });
    } else {
        routines.push({
            id: 'strength-signal-protocol',
            title: 'Quick Strength Session',
            duration: `${Math.round(15 * progressionFactor)} min`,
            category: 'body',
            videoColor: 'bg-sage/20',
            description: `Simple strength exercises to keep your muscles firm and strong while you're reaching your goal.`,
            steps: [
                { title: 'Slow Squats', image: '/exercises/sit-tall.png', description: `Lower yourself slowly to really work your leg muscles.` },
                { title: 'Push-Ups', image: '/exercises/sit-tall.png', description: `Focus on steady movements to build strength in your upper body.` },
                { title: 'Plank Hold', image: '/exercises/sit-tall.png', description: `Hold a steady position to strengthen your core and back.` }
            ],
            type: 'timer',
            timerDuration: Math.round(900 * progressionFactor),
            personalizationNote: `The intensity matches your ${streak}-day consistent progress.`
        });
    }

    // Stress Relief / Recovery
    routines.push({
        id: 'parasympathetic-reset',
        title: 'Deep Relaxation',
        duration: '5 min',
        category: 'stress',
        videoColor: 'bg-lavender/20',
        description: `Calm your mind and help your body recover faster with simple breathing.`,
        steps: [
            'Breathe in slowly for 4 seconds through your nose.',
            'Hold that breath gently for 4 seconds.',
            'Exhale slowly for 8 seconds through your mouth.',
            'Repeat this a few times to relax your whole body.'
        ],
        type: 'breath',
        personalizationNote: `Important for your body's recovery after a busy day.`
    });

    // Hydration Target
    routines.push({
        id: 'hydration-precision',
        title: 'Daily Water Refresh',
        duration: '1 min',
        category: 'evening',
        videoColor: 'bg-coral/20',
        description: `Double-check your water intake to keep your body hydrated and healthy.`,
        steps: [
            `Check if you have reached your ${(hydration / 1000).toFixed(1)}L goal for today.`,
            `If you're a bit behind, have a fresh glass of water now.`
        ],
        type: 'check',
        nutrition: { cals: 0, protein: 0, water: 0.5 },
        personalizationNote: `Target set based on your typical daily activity.`
    });

    return routines;
}
