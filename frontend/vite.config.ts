import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '');
  const env = loadEnv(mode, ".", "");
  return {
    // base: './',
    // base: '',
    server: {
      port: 3000,
      host: "0.0.0.0",
      //     allowedHosts: [
      //   'ahmed-web-v1.serveousercontent.com',
      //   '.serveousercontent.com'
      // ]
    },
    plugins: [react(), tailwindcss()],
    // define: {
    //   'process.env': {},
    //   'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
    //   'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
    //   ...Object.keys(env).reduce((prev, key) => {
    //     if (key.startsWith('VITE_')) {
    //       prev[`process.env.${key}`] = JSON.stringify(env[key]);
    //     }
    //     return prev;
    //   }, {}),
    // },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
