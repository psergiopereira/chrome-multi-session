module.exports = {
  //Título da aplicação
  title: 'Multi Session',

  //Versão da aplicação
  version: 1.1,

  //Se o navegador deve ser iniciado em full screen
  useFullScreen: true,

  //Se deseja abrir o devTools ao iniciar o navegador
  useDevTools: false,

  //Url padrão a ser executada ao abrir o navegador (quando não informada pelo usuário)
  defaultUrl: 'https://google.com/',

  //Localização do executável do Google Chrome
  chromePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',

  //Argumentos a serem passados na inicialização do Google Chrome
  initializeArgs: [
    '--disable-save-password-bubble',
    '--password-store=basic',
    '--disable-autofill',
    '--start-maximized',
    '--disable-plugins-discovery',
    '--disable-sync',
    '--disable-extensions',
    '--disable-features=Translate',
    '--no-default-browser-check',
    '--no-first-run',
    '--ash-no-nudges',
    '--disable-background-timer-throttling',
    '--autoplay-policy=user-gesture-required',
    '--disable-external-intent-requests',
    '--disable-features=PrivacySandboxSettings4',
  ],

  //
}
