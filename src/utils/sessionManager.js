const fs = require('fs').promises
const path = require('path')

const settings = require('./../settings')

//Path do usuário
const appDataPath = process.env.LOCALAPPDATA

//Nome base da aplicação para diretórios
const baseApplicationName = settings.title
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join('')

//Local da aplicação base
const fullApplicationPath = path.join(appDataPath, baseApplicationName)

// Caminho para o arquivo de sessão
const fullApplicationSessionFile = path.join(fullApplicationPath, 'sessions.json')

//Lendo as informações de sessão
const readSession = async () => {
  try {
    const data = await fs.readFile(fullApplicationSessionFile, 'utf8')
    if (!data || data == '') return ''

    return JSON.parse(data || '')
  } catch (err) {
    console.error('Erro ao ler ou analisar o arquivo JSON:', err)
    return ''
  }
}

//Salvando as informações de sessão
const saveSession = async sessions => {
  try {
    const jsonString = JSON.stringify(sessions)
    await fs.writeFile(fullApplicationSessionFile, jsonString, 'utf8')

    return true
  } catch (err) {
    console.error('Erro ao salvar o arquivo JSON:', err)
    return false
  }
}

//Criando um diretório
const createDir = async dirName => {
  if (Array.isArray(dirName)) dirName = dirName.join('\\')

  const folderPath = path.join(fullApplicationPath, dirName)

  try {
    await fs.access(folderPath)
    return false
  } catch (err) {
    await fs.mkdir(folderPath, { recursive: true })
    console.log(`Diretório criado em: ${folderPath}`)
    return true
  }
}

//Listando os diretórios de sessões
const getAllSessionDirs = async () => {
  try {
    const files = await fs.readdir(fullApplicationPath)

    const directories = []

    for (const file of files) {
      const fullPath = path.join(fullApplicationPath, file)
      const stat = await fs.stat(fullPath)
      if (stat.isDirectory()) {
        directories.push(file)
      }
    }

    return directories
  } catch (err) {
    console.error('Erro ao ler o diretório:', err)
  }
}

//Excluindo um diretório
const removeDirectory = async dirName => {
  const directoryPath = path.join(fullApplicationPath, dirName)

  try {
    await fs.rm(directoryPath, { recursive: true, force: true })
    console.log(`Diretório ${directoryPath} foi removido com sucesso.`)

    return true
  } catch (err) {
    console.error(`Erro ao remover o diretório ${directoryPath}:`, err)
    return false
  }
}

//Compondo o diretório da sessão
const composeDirById = sessionId => {
  return path.join(fullApplicationPath, sessionId)
}

module.exports = {
  readSession,
  saveSession,
  createDir,
  getAllSessionDirs,
  removeDirectory,
  composeDirById,
}
