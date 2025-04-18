
const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');

// Start the Electron app
const startElectron = () => {
  const electronProcess = spawn(electron, [path.join(__dirname, 'main.js')], {
    env: { ...process.env, NODE_ENV: 'development' },
  });

  electronProcess.stdout.on('data', (data) => {
    console.log(`Electron: ${data}`);
  });

  electronProcess.stderr.on('data', (data) => {
    console.error(`Electron Error: ${data}`);
  });

  electronProcess.on('close', (code) => {
    console.log(`Electron process exited with code ${code}`);
  });
};

// Start electron
startElectron();
