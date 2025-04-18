
const { build } = require('electron-builder');
const path = require('path');

// Configuration for electron-builder
const config = {
  appId: 'com.oneblaze.projectforge',
  productName: 'OneShell Project Forge',
  directories: {
    output: path.join(process.cwd(), 'dist-electron'),
    app: path.join(process.cwd()),
  },
  files: [
    'dist/**/*',
    'electron/**/*',
    'package.json',
  ],
  mac: {
    category: 'public.app-category.developer-tools',
    icon: path.join(process.cwd(), 'public/favicon.ico'),
  },
  win: {
    icon: path.join(process.cwd(), 'public/favicon.ico'),
  },
  linux: {
    category: 'Development',
    icon: path.join(process.cwd(), 'public/favicon.ico'),
  },
};

// Start the build process
async function startBuild() {
  try {
    await build({
      config,
    });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

startBuild();
