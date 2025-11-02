// Esta função é "mágica": ela é executada quando alguém acessa a URL do seu Web App
function doGet() {
  // Isso diz ao Google para pegar o arquivo 'index.html' e mostrá-lo no navegador
  return HtmlService.createHtmlOutputFromFile('index');
}