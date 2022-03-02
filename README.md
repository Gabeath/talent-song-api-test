# talent-song-api-test

## Instalação e execução da API
Após clonar o repositório do git, utilize o comando npm install para baixar todas as dependências do projeto. Com as dependências instaladas verificar se está utilizando a versão 12 do Nodejs para executar o projeto. Para iniciar a execução do projeto pode se utilizar o comando npm start, também é possível a execução da API pelo depurador do vscode.

## Libs importantes utilizadas
babel: permite utilizar o Nodejs no estilo ES6.
express-validator: facilita a validação dos dados que são enviados para a API.
jsonwebtoken: gera e valida tokens jwt.
module-alias: permite dar apelidos para caminhos do projeto, facilitando os imports.
sequelize: faz o papel de ORM do projeto.

## Estruturação do projeto
O projeto está dividido em três principais camadas, sendo elas:
  -controllers: responsáveis pela recepção e tratativa dos dados enviados para a API;
  -services: responsáveis pela aplicação das regras de negócio envolvidas no projeto;
  -repositories: responsáveis pela comunicação com o banco de dados utilizando o ORM;
Além disso temos a presença de módulos, tendo o app contendo as rotas da aplicação com seus controllers e services e o core contendo configurações de banco de dados, além dos repositories. Nessa estrutura é facilitada a criação de outros módulos para utilizar o mesmo core, podendo ser um módulo de jobs ou um módulo de dashboard, contendo outras APIs que conseguem disponibilizar outros tipos de funcionalidades, utilizando o mesmo contexto do projeto.