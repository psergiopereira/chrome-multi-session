const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const { execFile } = require('child_process')
const { readSession, saveSession, createDir, getAllSessionDirs, removeDirectory, composeDirById } = require('./src/utils/sessionManager')

//Informação das sessões atuais
let currentSessions = []

//Importando configurações
const settings = require('./src/settings')

//Gerando o id baseado da sessão
const generateSessionId = () => `session_${Date.now()}`

//Obtendo sessões salvas
const getSavedSessions = async () => {
  const readingSessions = await readSession()

  if (readingSessions && Array.isArray(readingSessions)) {
    readingSessions.forEach(sessionItem => {
      const currentSessionIndex = currentSessions.findIndex(currentSessionItem => currentSessionItem.id == sessionItem.id)

      if (currentSessionIndex == -1) {
        currentSessions.push(sessionItem)
      } else {
        Object.keys(sessionItem).forEach(key => {
          currentSessions[currentSessionIndex][key] = currentSessionItem[key]
        })
      }
    })
  }
}

//Removendo diretórios antigos
const removeOldDirectories = async () => {
  const listedDirs = await getAllSessionDirs()

  for (let i = 0; i < listedDirs.length; i++) {
    let checkDir = currentSessions.find(currentSession => currentSession.id == listedDirs[i])
    if (!checkDir) await removeDirectory(listedDirs[i])
  }
}

//Criando o a janela
const createWindow = () => {
  const browser = new BrowserWindow({
    width: 800,
    height: 600,
    title: `${settings.title} - V${settings.version}`,
    icon: path.join(__dirname, './public/icons/icon_32.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: settings.useDevTools,
    },
  })

  browser.setMenu(null)
  if (settings.useFullScreen) browser.maximize()
  if (settings.useDevTools) browser.webContents.openDevTools()

  browser.loadFile('public/html/index.html')
}

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//Quando a aplicação é fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//Obtendo as configurações
ipcMain.on('request-settings', event => event.sender.send('response-settings', settings))

//Obtendo as sessões
ipcMain.on('request-sessions', event => event.sender.send('response-sessions', currentSessions))

//Salvando uma sessão
ipcMain.on('save-session', async (event, payload) => {
  if (!payload.id || payload.id == '') payload.id = generateSessionId()

  //Atualizando sessões locais
  let findSessionExists = currentSessions.findIndex(search => search.id == payload.id)
  if (findSessionExists == -1) {
    currentSessions.push(payload)
  } else {
    Object.keys(payload).forEach(key => {
      currentSessions[findSessionExists][key] = payload[key]
    })
  }

  //Salvando sessões
  await saveSession(currentSessions)

  //Criando o diretório
  await createDir(payload.id)

  //Retornando sessões atualizadas
  event.sender.send('response-sessions', currentSessions)
})

//Excluindo uma sessão
ipcMain.on('remove-saved-session', async (event, payload) => {
  if (!payload || payload == '') return

  //Atualizando sessões locais
  currentSessions = currentSessions.filter(search => search.id != payload)

  //Salvando sessões
  await saveSession(currentSessions)

  //Removendo o diretório
  await removeDirectory(payload)

  //Retornando sessões atualizadas
  event.sender.send('response-sessions', currentSessions)
})

//Executando uma sessão
ipcMain.on('open-session', async (event, payload) => {
  if (!payload || payload == '') return

  let sessionToOpen = currentSessions.find(search => search.id == payload)
  if (!sessionToOpen) return

  let sessionDir = composeDirById(sessionToOpen.id)

  let composeArgs = [`--user-data-dir=${sessionDir}`, ...settings.initializeArgs, sessionToOpen.home || settings.defaultUrl]

  execFile(settings.chromePath, composeArgs, (error, stdout, stderr) => {
    if (error) console.error('Erro ao executar o Chrome:', error)
  })
})

//Função principal
const main = async () => {
  //Obtendo sessões salvas
  await getSavedSessions()

  //Criando o diretório base
  await createDir('')

  //Removendo diretórios antigos
  await removeOldDirectories()

  //Criando janela principal
  createWindow()
}

//Iniciando
app.on('ready', main)
