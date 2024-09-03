/* Main JS to multi-session */
const app = Vue.createApp({
  data() {
    return {
      // Básicos
      title: '',
      version: 0,

      // Se o editor deve será mostrado
      showEditor: false,

      // Dados a serem editados
      editSessionId: '',
      editSessionTitle: '',
      editSessionNote: '',
      editionSessionHome: '',
      editionSessionError: '',

      // Lista de sessões atuais
      sessions: [],
    }
  },

  methods: {
    populateEdition(data) {
      this.editSessionId = data.id || ''
      this.editSessionTitle = data.title || ''
      this.editionSessionHome = data.home || ''
      this.editSessionNote = data.note || ''
    },

    // Abrindo formulário para nova sessão
    createSession() {
      this.populateEdition({})
      this.showEditor = true
    },

    // Salvar uma sessão
    async saveSession(data) {
      this.editionSessionError = ''

      if (!this.editSessionTitle) {
        this.editionSessionError = 'Ops, você precisa informar ao menos o título para a sessão!'
        return
      }

      await window.electronAPI.saveSession({
        id: this.editSessionId,
        title: this.editSessionTitle || '',
        home: this.editionSessionHome || '',
        note: this.editSessionNote || '',
      })

      this.populateEdition({})
      this.showEditor = false
    },

    // Cancelando a edição
    saveCancel() {
      this.populateEdition({})
      this.showEditor = false
    },

    // Iniciando uma sessão
    async openSession(data) {
      await window.electronAPI.openSavedSession(data.id || '')
    },

    // Iniciando a edição de uma sessão
    editSession(data) {
      this.populateEdition(data)
      this.showEditor = true
    },

    // Excluindo uma sessão
    async removeSession(data) {
      await window.electronAPI.removeSavedSession(data.id || '')
    },

    //
  },

  computed: {
    // Verificando se há sessões disponíveis
    hasSessions() {
      return this.sessions.length > 0
    },

    //
  },

  watch: {
    //
  },

  created() {
    // Obtendo dados de configuração
    window.electronAPI.receiveSettings((event, data) => {
      this.title = data.title
      this.version = data.version
    })

    // Obtendo as sessões
    window.electronAPI.receiveSessions((event, data) => {
      this.sessions = data
    })

    // Disparando solicitações iniciais
    window.electronAPI.requestSettings()
    window.electronAPI.requestSessions()

    //
  },
})

app.mount('#app')
