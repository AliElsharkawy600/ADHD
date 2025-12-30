/// <reference types="vite/client" />

// declare global {
//   var process: {
//     env: {
//       VITE_API_BASE_URL: string;
//       VITE_GOOGLE_CLIENT_ID: string;
//       [key: string]: string;
//     }
//   };
// }

// // declare var process: {
// //   env: {
// //     VITE_API_BASE_URL: string;
// //     VITE_GOOGLE_CLIENT_ID: string;
// //     [key: string]: string; 
// //   }
// // };

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}