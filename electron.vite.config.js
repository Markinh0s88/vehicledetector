
const { defineConfig } = require('vite');
const path = require('path');

module.exports = defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: path.join(__dirname, 'electron/main.js'),
        },
      },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: path.join(__dirname, 'electron/preload.js'),
        },
      },
    },
  },
  electron: {
    build: {
      config: {
        directories: {
          output: 'dist-electron',
          app: 'dist'
        },
        files: [
          'dist/**/*',
          'electron/**/*',
          'node_modules/**/*'
        ],
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowElevation: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: "Controle de Acesso",
          include: path.join(__dirname, 'installer.nsh'),
          installerIcon: "public/favicon.ico",
          uninstallerIcon: "public/favicon.ico",
          installerHeader: "public/favicon.ico",
          installerHeaderIcon: "public/favicon.ico"
        },
        win: {
          target: [
            {
              target: "nsis",
              arch: ["x64"]
            }
          ]
        }
      }
    }
  }
});
