/**
 * Subscription Feature Gate System
 * Defines which features are available to which subscription tiers
 */

export type SubscriptionTier = 'free' | 'premium' | 'trial';

export interface SubscriptionStatus {
    tier: SubscriptionTier;
    expiresAt: Date | null;
    trialUsed: boolean;
    daysRemaining: number | null;
}

/**
 * Feature keys that can be gated by subscription tier
 */
export const FEATURE_KEYS = {
    // Practice Library
    UNLIMITED_PRACTICES: 'unlimited_practices',
    MASTERY_PACKS: 'mastery_packs',

    // Progress Tracking
    FULL_GLOW_HISTORY: 'full_glow_history',
    PHOTO_PROGRESS: 'photo_progress',
    GLOW_ANALYTICS: 'glow_analytics',

    // Personal Tools
    PRIVATE_JOURNAL: 'private_journal',
    AI_COACH: 'ai_coach',
    CUSTOM_REMINDERS: 'custom_reminders',

    // Community
    COMMUNITY_POST: 'community_post',
    COMMUNITY_REACT: 'community_react',
    JOIN_CHALLENGES: 'join_challenges',

    // Mobile Features
    OFFLINE_MODE: 'offline_mode',
    SMART_MIRROR: 'smart_mirror',

    // Premium Content
    AMBIENT_SOUNDS: 'ambient_sounds',
    LIVE_SESSIONS: 'live_sessions',
} as const;

export type FeatureKey = typeof FEATURE_KEYS[keyof typeof FEATURE_KEYS];

/**
 * Defines which tiers have access to which features
 * - 'free': Only free users
 * - 'premium': Only paying customers
 * - 'trial': Users on free trial (treated as premium for most features)
 */
export const FEATURE_GATES: Record<FeatureKey, SubscriptionTier[]> = {
    // Practice Library
    [FEATURE_KEYS.UNLIMITED_PRACTICES]: ['premium', 'trial'],
    [FEATURE_KEYS.MASTERY_PACKS]: ['premium', 'trial'],

    // Progress Tracking
    [FEATURE_KEYS.FULL_GLOW_HISTORY]: ['premium', 'trial'],
    [FEATURE_KEYS.PHOTO_PROGRESS]: ['free', 'premium', 'trial'],
    [FEATURE_KEYS.GLOW_ANALYTICS]: ['premium', 'trial'],

    // Personal Tools
    [FEATURE_KEYS.PRIVATE_JOURNAL]: ['free', 'premium', 'trial'],
    [FEATURE_KEYS.AI_COACH]: ['premium'], // Premium only, not trial
    [FEATURE_KEYS.CUSTOM_REMINDERS]: ['premium', 'trial'],

    // Community
    [FEATURE_KEYS.COMMUNITY_POST]: ['premium', 'trial'],
    [FEATURE_KEYS.COMMUNITY_REACT]: ['premium', 'trial'],
    [FEATURE_KEYS.JOIN_CHALLENGES]: ['premium', 'trial'],

    // Mobile Features
    [FEATURE_KEYS.OFFLINE_MODE]: ['premium'], // Premium only
    [FEATURE_KEYS.SMART_MIRROR]: ['premium', 'trial'],

    // Premium Content
    [FEATURE_KEYS.AMBIENT_SOUNDS]: ['premium', 'trial'],
    [FEATURE_KEYS.LIVE_SESSIONS]: ['premium'], // Premium only
};

/**
 * Check if a user's tier can access a specific feature
 */
export function canAccessFeature(
    userTier: SubscriptionTier,
    featureKey: FeatureKey
): boolean {
    const allowedTiers = FEATURE_GATES[featureKey];
    if (!allowedTiers) {
        console.warn(`Unknown feature key: ${featureKey}`);
        return false;
    }
    return allowedTiers.includes(userTier);
}

/**
 * Get user-friendly feature names for UI display
 */
export const FEATURE_DISPLAY_NAMES: Record<FeatureKey, string> = {
    [FEATURE_KEYS.UNLIMITED_PRACTICES]: 'Unlimited Biological Protocols',
    [FEATURE_KEYS.MASTERY_PACKS]: 'Phase-Shift Mastery Modules',
    [FEATURE_KEYS.FULL_GLOW_HISTORY]: 'Complete Metabolic Flow History',
    [FEATURE_KEYS.PHOTO_PROGRESS]: 'Visual Identity Transformation Log',
    [FEATURE_KEYS.GLOW_ANALYTICS]: 'Bio-Neural Analytics Suite',
    [FEATURE_KEYS.PRIVATE_JOURNAL]: 'Secure Reflection Vault',
    [FEATURE_KEYS.AI_COACH]: 'Predictive Bio-Coach (AI)',
    [FEATURE_KEYS.CUSTOM_REMINDERS]: 'Synchronized Protocol Triggers',
    [FEATURE_KEYS.COMMUNITY_POST]: 'Global Hub Transmission',
    [FEATURE_KEYS.COMMUNITY_REACT]: 'Inter-Member Resonances',
    [FEATURE_KEYS.JOIN_CHALLENGES]: '21-Day Systems Optimization',
    [FEATURE_KEYS.OFFLINE_MODE]: 'Offline Protocol Access',
    [FEATURE_KEYS.SMART_MIRROR]: 'Smart Mirror Form Calibration',
    [FEATURE_KEYS.AMBIENT_SOUNDS]: 'Circadian Audio-Scapes',
    [FEATURE_KEYS.LIVE_SESSIONS]: 'Real-Time Protocol Lab',
};

/**
 * Feature descriptions for paywall modal
 */
export const FEATURE_DESCRIPTIONS: Record<FeatureKey, string> = {
    [FEATURE_KEYS.UNLIMITED_PRACTICES]: 'Access the full architectural library of 100+ guided biological protocols',
    [FEATURE_KEYS.MASTERY_PACKS]: 'Intensive multi-phase protocols for total metabolic recalibration',
    [FEATURE_KEYS.FULL_GLOW_HISTORY]: 'Review every data-point of your journey with high-fidelity analytics',
    [FEATURE_KEYS.PHOTO_PROGRESS]: 'Document your physical evolution with secure, industrial-grade logging',
    [FEATURE_KEYS.GLOW_ANALYTICS]: 'Deep-learning insights on your consistency and biological trends',
    [FEATURE_KEYS.PRIVATE_JOURNAL]: 'A private, encrypted space for documenting metabolic state changes',
    [FEATURE_KEYS.AI_COACH]: 'Personalized bio-hacking strategies powered by neural forecasting',
    [FEATURE_KEYS.CUSTOM_REMINDERS]: 'Calibrate your daily rituals with precision-timed notifications',
    [FEATURE_KEYS.COMMUNITY_POST]: 'Transmit your progress to the elite practitioner network',
    [FEATURE_KEYS.COMMUNITY_REACT]: 'Engage with the Hub through high-signal encouragement',
    [FEATURE_KEYS.JOIN_CHALLENGES]: 'Commit to rigorous, protocol-driven transformation benchmarks',
    [FEATURE_KEYS.OFFLINE_MODE]: 'Retain access to mission-critical protocols without connectivity',
    [FEATURE_KEYS.SMART_MIRROR]: 'High-precision computer vision for biomechanical form correction',
    [FEATURE_KEYS.AMBIENT_SOUNDS]: 'Acoustic environments engineered for focus and recovery',
    [FEATURE_KEYS.LIVE_SESSIONS]: 'Direct interactive access to Lead Protocol Engineers',
};

/**
 * Pricing configuration
 */
export const PRICING = {
    monthly: {
        price: 9.99,
        currency: 'USD',
        interval: 'month' as const,
    },
    yearly: {
        price: 99.99,
        currency: 'USD',
        interval: 'year' as const,
        savings: '2 months free',
    },
    trial: {
        days: 7,
        requiresPaymentMethod: true,
    },
};

/**
 * Calculate subscription status from user data
 */
export function getSubscriptionStatus(user: {
    subscriptionTier?: string;
    subscriptionExpiresAt?: string | null;
    trialUsed?: boolean;
}): SubscriptionStatus {
    const tier = (user.subscriptionTier as SubscriptionTier) || 'free';
    const expiresAt = user.subscriptionExpiresAt ? new Date(user.subscriptionExpiresAt) : null;
    const now = new Date();

    let daysRemaining: number | null = null;
    if (expiresAt && tier !== 'free') {
        const diffTime = expiresAt.getTime() - now.getTime();
        daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return {
        tier,
        expiresAt,
        trialUsed: user.trialUsed ?? false,
        daysRemaining,
    };
}
