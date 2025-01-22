Desenvolver um cliente Rest onde seja possível visualizar de forma amigável as informações de propriedades dos países presentes na API (https://restcountries.com) como nome, capital, região, sub-região, população, área, fuso horário, nome nativo e a bandeira.

A aplicação deve ter o mecanismo para exportar as informações dos países para o formato XLS, CSV e XML.



**Solução Desenvolvida**

A solução foi desenvolvida utilizando React, garantindo uma solução com  interface moderna e responsiva.

Funcionalidades Implementadas

**Barra de Pesquisa:**

O cliente pode pesquisar qualquer país pelo nome.

Os países são listados de acordo com as letras digitadas.

**Slide Show Interativo:**

Permite navegar entre os países de forma intuitiva deslizando na tela.

**Detalhes dos Países:**

Cada país apresenta suas informações detalhadas.

Botão "Ver mais" para acessar detalhes adicionais.

Exportação de Dados:

As informações podem ser exportadas para os seguintes formatos:

XLS (Excel)

CSV (Comma Separated Values)

XML (Extensible Markup Language)
e por fim um botão para visitar o país onde vai ser direcionado ao Google Maps e verá a capital do tal país 
**Tecnologias Utilizadas**

React: Para criação da interface de usuário responsiva.
JS: para lógica de negócio, animações 

REST API: Consumo da API https://restcountries.com para obter os dados.
NODE.JS : para permitir criar o projecto React

**Pacotes Utilizados:**

http para requisições HTTP.

excel para geração de arquivos XLS.

csv para exportação de dados em formato CSV.

xml para criação de documentos XML.

npm para instalação de dependências


**Como Executar o Projeto**

**Primeiro garanta ter o ambiente instalado**

controi o projecto:
**npm run build**

Instale as dependências:

**npm install**


Execute o projeto:
**npm start**
