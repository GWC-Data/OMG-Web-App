import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.omg.ohmygod',
  appName: 'OMG - Oh My God',
  webDir: 'dist',
  server: {
    url: 'https://4c0e60be-7483-4e42-9788-e3a31e92eaaf.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FF6600",
      showSpinner: false
    }
  }
};

export default config;
