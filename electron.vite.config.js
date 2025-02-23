
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
});

