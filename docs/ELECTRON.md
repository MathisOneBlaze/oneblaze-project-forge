
# OneShell Project Forge - Desktop Application

This document explains how to run and build the desktop version of OneShell Project Forge using Electron.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Setup

After cloning the repository, install the dependencies:

```bash
npm install
# or
yarn install
```

## Development

To run the application in development mode, you need to:

1. Start the Vite development server
2. Start the Electron application

You can do this by running:

```bash
# Terminal 1: Start the Vite development server
npm run dev

# Terminal 2: Start Electron pointing to the dev server
node electron/electron-start.js
```

This will launch the Electron app and load the UI from the Vite dev server, allowing you to see changes instantly.

## Building for Production

To build the desktop application for distribution:

```bash
# First build the React app
npm run build

# Then build the Electron app
node electron/build.js
```

The packaged application will be available in the `dist-electron` directory.

## File System Features

The desktop application provides native file system access that the web version cannot offer:

1. **Folder Selection**: Use native folder pickers to select where projects should be created
2. **Direct Folder Creation**: Create project structures directly on your filesystem
3. **Save/Load Templates**: Store templates locally for future use

## Electron API

The application exposes two main methods through the Electron API:

1. `window.electronAPI.selectDirectory()` - Opens a native folder picker dialog
2. `window.electronAPI.createProjectStructure(options)` - Creates folders and files based on a structure object

These methods are used internally by the application and are available through the `useElectron` hook in the React code.

## Customization

### Application Icons

To change the application icon, replace the file at `public/favicon.ico` with your own icon. Then rebuild the application.

### Application Name

To change the application name:

1. Update the `productName` in `electron/build.js`
2. Update the `name` in `package.json`

## Troubleshooting

### Application doesn't start

- Make sure all dependencies are installed
- Check the console output for errors
- Verify that the correct ports are available (8080 for development)

### File system operations fail

- Ensure the application has the necessary permissions
- Check that paths are valid for your operating system
- Look for error details in the application console

## Packaging for Different Platforms

By default, electron-builder will package the app for your current platform. To build for other platforms:

```bash
# For macOS
node electron/build.js --mac

# For Windows
node electron/build.js --win

# For Linux
node electron/build.js --linux

# For all platforms
node electron/build.js --mac --win --linux
```

Note that building for macOS requires a macOS system, while Windows and Linux builds can be cross-compiled.
