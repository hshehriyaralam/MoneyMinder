import path from "path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const define = {
    "import.meta.env.VITE_GOOGLE_CLIENT_ID": JSON.stringify(
      env.VITE_GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID || "",
    ),
  };

  if (mode === "development") {
    define["import.meta.env.VITE_API_BASE_URL"] = JSON.stringify("");
  }

  return {
    define,
    base: "/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "./src"),
      },
    },
    build: {
      target: "es2020",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;
            if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react-vendor";
            if (/node_modules[\\/](react-router|react-router-dom)[\\/]/.test(id)) return "router";
            return undefined;
          },
        },
      },
    },
    esbuild: {
      pure: ["console.log"],
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://money-minder-backend.vercel.app',
          changeOrigin: true,
          secure: false
        },
      },
      host: true,
      port: 5173,
    },
  };
});
