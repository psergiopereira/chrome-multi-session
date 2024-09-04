# Chrome Multi Session

O Chrome multi session é uma pequena aplicação simples não oficial cujo objetivo é a abertura do Google Chrome instalado em seu ambiente Windows em sessões independentes.

# Iniciativa

Em diversos casos, precisamos de sessões independentes do navegador sem precisar usar de "manejamento" dos cookies de sessão e para isso, em alguns casos, é necessário até instalar mais navegadores no computador para poder abrir mais contas de serviços sem que as mesmas entrem em conflito de cookies e sem que ser necessário realizar o logout e login o tempo todo.

## Funcionalidade

Essa pequena aplicação, permite que você gere e mantenha novas "sessões" do Google Chrome em seu computador sem precisar instalar diversos navegadores.
Cada sessão é independente, ou seja, seria o equivalente a ter diversas instalações únicas do Chrome em seu computador.
Cada sessão ficará salva, mesmo quando você fecha o navegador, podendo assim, retornar sempre que desejar, e quando desejar, pode excluir facilmente a mesma.
Você pode criar quantas sessões desejar!

## Outros pontos importantes

Além de executar sessões distintas, também é passada algumas "flags" para o Chrome no momento da execução, essas flags servem para desabilitar alguns comportamentos padrões do navegador, então, sinta-se a vontade para alterá-las no arquivo: `src/settings.js`

## Aplicação

A aplicação roda inteiramente em node.js, utilizando o Electron.js para renderizar a interface gráfica onde se gerencia as sessões.
As informações do gerenciamento das sessões ficam salvas no arquivo `sessions.json`, dentro do diretório principal da aplicação.
Os dados de cada sessão é armazenado no diretório principal da aplicação, localizado em: `C:\Users\LOCAL_USER_NAME\AppData\Local\MultiSession`.

- LOCAL_USER_NAME é o nome do seu computador local.
- MultiSession é o nome da aplicação em Pascalcase gerado automaticamente de acordo com o nome definido no arquivo de configuração presente em `src/settings.json`

## Instalar e rodar o projeto

Rodar a aplicação é extremamente simples, após clonar o repositório para o seu computador, execute o comando abaixo para instalar as dependências:

```bash
npm install
```

Para iniciar a aplicação diretamente via terminal, utilize:

```bash
npm start
```

Caso deseje fazer alterações e ir acompanhando as mudanças em tempo real, você pode utilizar o comando abaixo, que irá iniciar a aplicação electron.js em conjunto com o nodemon:

```bash
npm run serve
```

Para buildar a aplicação em um executável, utilize o comando:

```bash
npm run build
```

## Libs usadas na aplicação

- https://icons.getbootstrap.com/
- https://getbootstrap.com/
- https://vuejs.org/

## Nota

Sinta-se a vontade para manipular, estender e melhorar a aplicação como desejar para o seu propósito ;)

## Nota Legal

Essa é uma aplicação independente que utiliza o Google Chrome instalado em seu computador para funcionar, não é uma aplicação oficial, mantida ou apoiada pela Google.
O intuito da aplicação é facilitar o gerenciamento de sessões de navegador, o uso da aplicação ou de qualquer parte/código da mesma para fins ilícitos é de inteira responsabilidade do usuário.
