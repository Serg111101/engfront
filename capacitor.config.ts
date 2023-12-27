import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Engined',
  webDir: 'build',
  bundledWebRuntime:false,
  server: {
   url:'http://192.168.90.105:3456',
   cleartext:true
  }
};

export default config;
