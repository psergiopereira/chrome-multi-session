const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  //Settings
  requestSettings: () => ipcRenderer.send('request-settings'),
  receiveSettings: callback => ipcRenderer.on('response-settings', callback),

  //Sessions
  requestSessions: () => ipcRenderer.send('request-sessions'),
  receiveSessions: callback => ipcRenderer.on('response-sessions', callback),

  //Salvando sessões
  saveSession: payload => ipcRenderer.send('save-session', payload),

  //Excluindo uma sessão
  removeSavedSession: payload => ipcRenderer.send('remove-saved-session', payload),
  
  //Executando uma sessão
  openSavedSession: payload => ipcRenderer.send('open-session', payload),
})
