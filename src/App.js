import React, { useState, useEffect } from 'react';

import Sidebar from './Sidebar'
import Sidebar2 from './Sidebar2.js'
import './Sidebar2.css'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function App() {

  const [appVersion, setAppVersion] = useState();
  
  useEffect(() => {
    getAppVersion()
  }, []);

  //make request to main.js to get app version
  function getAppVersion() {
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      setAppVersion(arg.version)
    });
  }

  
  const notification = document.getElementById('notification');
  const message = document.getElementById('message');
  const restartButton = document.getElementById('restart-button');
  
  ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    message.innerText = 'A new update is available. Downloading now...';
    notification.classList.remove('hidden');
  });
  
  ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    restartButton.classList.remove('hidden');
    notification.classList.remove('hidden');
  });

  function closeNotification() {
    notification.classList.add('hidden');
  }

  function restartApp() {
    ipcRenderer.send('restart_app');
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Version {appVersion}</h1>
        <Sidebar2 />

        <div id="notification" className="hidden">
          <p id="message"></p>
          <button id="close-button" onClick={closeNotification}>
            Close
          </button>
          <button id="restart-button" onClick={restartApp} className="hidden">
            Restart
          </button>
        </div>

      </header>
    </div>
  );
}



export default App;
