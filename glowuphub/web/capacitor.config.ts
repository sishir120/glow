import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.glowuphub.app',
  appName: 'GlowUp Hub',
  webDir: 'out',
  server: {
    url: 'https://glowuphub-six.vercel.app',
    cleartext: true
  }
};

export default config;
