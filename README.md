# App de Autodeclaração de Cor

Este é um projeto de Web App para o Google for Education, permitindo que alunos façam sua autodeclaração de raça/cor.

O projeto é construído usando Google Apps Script (GAS) e sincronizado localmente usando a ferramenta [Clasp](https://github.com/google/clasp).

## 🚀 Tecnologias Utilizadas

* **Google Apps Script (GAS):** Para o backend e para servir o Web App.
* **HTML5:** Estrutura do formulário.
* **CSS3:** (Em breve) Estilização do formulário.
* **JavaScript:** (Em breve) Validação e interação do formulário.
* **Clasp:** Para desenvolvimento local e deploy.
* **Git & GitHub:** Para controle de versão.

## 💻 Como Funciona

1.  O usuário acessa a URL pública do Web App (gerada pelo GAS).
2.  O `Code.gs` (no lado do servidor) executa a função `doGet()` e serve o arquivo `index.html`.
3.  O usuário preenche o formulário no `index.html`.
4.  (Em breve): Ao clicar em "Enviar", o JavaScript do formulário enviará os dados de volta para uma função no `Code.gs` (ex: `salvarDados()`), que irá registrar as informações em uma Planilha Google.

## Status

*Em desenvolvimento.*