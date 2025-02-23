
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
          'electron/**/*'
        ],
        asar: true
      }
    }
  }
});
