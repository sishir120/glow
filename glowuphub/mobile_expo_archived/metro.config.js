const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// NOTE: withNativeWind can cause ESM protocol errors on Windows local dev.
// For production builds/updates, run from a Linux environment or WSL.
module.exports = withNativeWind(config, { input: "./global.css" });
