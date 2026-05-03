try {
    const { getDefaultConfig } = require('expo/metro-config');
    console.log('expo/metro-config found');
    const { withNativeWind } = require('nativewind/metro');
    console.log('nativewind/metro found');
    const config = getDefaultConfig(__dirname);
    withNativeWind(config, { input: './global.css' });
    console.log('Success');
} catch (e) {
    console.log('--- ERROR START ---');
    console.log(e.message);
    console.log(e.stack);
    console.log('--- ERROR END ---');
    process.exit(1);
}
