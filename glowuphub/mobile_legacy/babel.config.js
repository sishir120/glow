module.exports = function (api) {
    api.cache(true);

    // Detect if we are running in an environment where we can support Nativewind ESM
    // On Windows local, we fallback to a simpler config to avoid path errors
    // that block EAS submissions.
    const isWindows = process.platform === "win32";

    return {
        presets: [
            "babel-preset-expo"
        ],
        plugins: [
            "react-native-reanimated/plugin",
        ],
    };
};
