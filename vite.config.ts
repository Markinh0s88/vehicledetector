
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  electron: {
    builder: {
      appId: "com.controleacesso.app",
      productName: "Controle de Acesso",
      win: {
        target: [
          {
            target: "nsis",
            arch: ["x64"]
          }
        ],
        icon: "public/favicon.ico"
      },
      nsis: {
        oneClick: true,
        perMachine: true,
        allowElevation: true,
        allowToChangeInstallationDirectory: false,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: "Controle de Acesso",
        include: "./installer.nsh"
      }
    }
  }
}));
