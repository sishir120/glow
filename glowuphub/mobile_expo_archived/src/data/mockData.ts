export const MOCK_USER = {
    id: 'mock-user-1',
    name: 'Beautiful',
    email: 'demo@glowup.com',
    streak: 12, // Realistic streak
    logs: [
        {
            date: new Date().toISOString(),
            glowScore: 82, // Strong self-care
            moveScore: 45, // Moderate movement (mid-day)
            mindScore: 90, // High mindfulness
        }
    ]
};

export const MOCK_ROUTINES = [
    {
        id: 'r1',
        name: 'Morning Metabolic Reset',
        category: 'Morning',
        habits: [
            {
                id: 'h1',
                name: 'Morning Hydration',
                duration: 2,
                scientificRationale: "Evidence suggests that morning hydration triggers cellular activation and improves metabolic rate post-sleep.",
                citations: ["https://pubmed.ncbi.nlm.nih.gov/24715487/"]
            },
            {
                id: 'h2',
                name: 'Intermittent Fasting Check',
                duration: 1,
                scientificRationale: "Tracking your fasting window helps optimize insulin sensitivity and promotes fat oxidation.",
                citations: ["https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5411330/"]
            },
            {
                id: 'h3',
                name: 'Core Activation',
                duration: 5,
                scientificRationale: "Gentle core engagement improves posture and metabolic thermogenesis for the day ahead.",
                citations: ["https://www.nature.com/articles/s41598-019-54530-w"]
            },
            {
                id: 'h4',
                name: 'NEAT Goal Setting',
                duration: 2,
                scientificRationale: "Setting non-exercise activity goals significantly increases daily caloric expenditure.",
                citations: ["https://www.jaad.org/article/S0190-9622(13)00412-2/fulltext"]
            },
        ]
    },
    {
        id: 'r2',
        name: 'Evening Fat-Burn Unwind',
        category: 'Evening',
        habits: [
            {
                id: 'h5',
                name: 'Protein-First Meal Prep',
                duration: 10,
                scientificRationale: "Prioritizing protein reduces late-night cravings and supports muscle preservation during weight loss.",
                citations: ["https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5411330/"]
            },
            {
                id: 'h6',
                name: 'Cortisol Management',
                duration: 5,
                scientificRationale: "Lowering evening cortisol through mindful practices prevents stress-induced abdominal fat storage.",
                citations: ["https://pubmed.ncbi.nlm.nih.gov/23746213/"]
            },
            {
                id: 'h7',
                name: 'Tomorrow\'s Goal',
                duration: 5,
                scientificRationale: "Visualizing health goals improves adherence to nutritional protocols and consistency.",
                citations: ["https://pubmed.ncbi.nlm.nih.gov/12585811/"]
            },
        ]
    }
];

// Identity reinforcement phrases
export const IDENTITY_PHRASES = [
    "I keep promises to myself.",
    "My consistency is my confidence.",
    "Small practices, lasting radiance.",
    "I honor my body with gentle care.",
    "Every day I choose myself.",
];

// Compassionate recovery messages
export const RECOVERY_MESSAGES = [
    "Rest is part of the practice. Your practice is always here when you return.",
    "Life flows differently some days. Pick up where you left off, with grace.",
    "Missing a day doesn't break your journey. It's just a pause in the rhythm.",
];

export const MOCK_UP_NEXT = ['Metabolic Reset', 'Hydration Cue', 'Evening Reflection'];
