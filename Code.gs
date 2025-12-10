// COLOCAR O ID DA SUA PLANILHA AQUI
const SPREADSHEET_ID = "16lfKYO6LUvyu0csNzPu_4YsTzF7496WPe1P3x99sKuQ"; 
const SHEET_NAME = "DB Respostas"; 

// -----------------------------------------------------------------------
// FUNÇÃO: doGet()
// O QUE FAZ: É a "Porta de Entrada" do seu site.
// QUANDO RODA: Automaticamente, toda vez que alguém acessa o link do Web App.
// -----------------------------------------------------------------------
function doGet() {

// 1. HtmlService: É a ferramenta do Google que mexe com HTML.
// 2. createHtmlOutputFromFile('index'): Manda o Google procurar o arquivo 'index.html'
// no seu projeto e "servir" o conteúdo dele para o usuário.
  return HtmlService.createHtmlOutputFromFile('index')

// Define o que aparece escrito na aba do navegador (lá em cima).
      .setTitle('Política de Equidade Racial')

// IMPORTANTE: Permite que seu site seja colocado "dentro" de outros sites (iFrame).
// Sem isso, se você tentar colocar esse formulário dentro de um Google Sites,
// ele seria bloqueado por segurança. O 'ALLOWALL' libera o acesso.
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)

// ESSENCIAL PARA CELULAR: Adiciona uma etiqueta invisível (meta tag) que avisa 
// o navegador do celular para ajustar o tamanho da tela corretamente.
// Sem isso, o site ficaria com letras minúsculas no smartphone.      
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function processarFormulario(dadosFormulario) {
  // 1. Chama o "Porteiro" (LockService)
  const lock = LockService.getScriptLock();
  
  try {
    // 2. Tenta trancar a porta por até 20 segundos (20000 ms)
    // Se estiver ocupado, ele espera. Se passar 10s e não conseguir, dá erro.
    lock.waitLock(20000); 

    // --- ZONA SEGURA (Só um usuário passa aqui por vez) ---

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error("Aba não encontrada. Verifique o nome.");
    }

    const dataHora = new Date();

    // Tratamento das Necessidades Especiais (Lista -> Texto)
    let necessidadesTexto = "Nenhuma";
    if (Array.isArray(dadosFormulario.necessidades)) {
      necessidadesTexto = dadosFormulario.necessidades.join(", ");
    } else if (dadosFormulario.necessidades) {
      necessidadesTexto = dadosFormulario.necessidades;
    }

    // Organiza a linha (Igual à sua planilha)
    const novaLinha = [
      dataHora,
      dadosFormulario.nomeMaeAluno,
      dadosFormulario.nomePaiAluno,
      dadosFormulario.cpfResponsavel,
      dadosFormulario.contato1,
      dadosFormulario.contato2,
      dadosFormulario.contato3,
      dadosFormulario.rendaFamiliar,
      dadosFormulario.tem_programa_social,
      dadosFormulario.escola,
      dadosFormulario.nomeAluno,
      dadosFormulario.dataNascimento,
      dadosFormulario.idade,
      dadosFormulario.logradouro,
      dadosFormulario.numero,
      dadosFormulario.complemento,
      dadosFormulario.bairro,
      dadosFormulario.cidade,
      dadosFormulario.estadoNascimento,
      dadosFormulario.cidadeNascimento,
      dadosFormulario.cpf,
      dadosFormulario.ra,
      dadosFormulario.transporteEscolar,
      necessidadesTexto,
      dadosFormulario.necOutroDescricao,
      dadosFormulario.corRaca,
      dadosFormulario.lgpdConsent
    ];

    sheet.appendRow(novaLinha);
    
    // --- FIM DA ZONA SEGURA ---
    
    return { success: true, message: "Dados salvos com sucesso!" };

  } catch (e) {
    return { success: false, message: "Erro ao salvar: " + e.toString() };
    
  } finally {
    // 3. O porteiro destranca a porta (Sempre executa, mesmo se der erro)
    lock.releaseLock();
  }
}