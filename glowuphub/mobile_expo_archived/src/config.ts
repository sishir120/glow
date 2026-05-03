const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
    console.warn(
        "WARNING: EXPO_PUBLIC_API_URL is missing. API calls will fail."
    );
}

export const API_URL = apiUrl || "";
