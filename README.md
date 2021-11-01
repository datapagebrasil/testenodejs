# Teste datapage Node JS

Segue abaixo os passos para a execução do projeto. Os prints das telas com a execução das atividades estão no arquivo `evidencias.docx`.

## Instruções

- Dentro de `datapage-nodejs` crie uma cópia do arquivo `.env.example` com o nome `.env`. Não precisa modificar os valores que já estão no arquivo exemplo:

```
# APPLICATION
NODE_ENV=development
PORT=3030

# MYSQL DB
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=user-app
MYSQL_PASSWORD=senha-teste-app
MYSQL_DATABASE=teste-app
MYSQL_ROOT_PASSWORD=root

#SQLPad
SQLPAD_PORT=3000
SQLPAD_ADMIN='admin@sqlpad.com'
SQLPAD_ADMIN_PASSWORD='admin'
SQLPAD_HOST=mysql
```

Na raiz do projeto, execute o comando `docker-compose --env-file datapage-nodejs/.env up -d --build` para criar os conteiners necessários para a execução do projeto.
  - O serviço `sqlpad` foi adicionado para auxiliar nas consultas ao banco de dados (se trata de uma ferramenta visual como o MySQL Workbench). Ele pode ser acessado com `http://localhost:3000/signin`, utilizando *admin@sqlpad.com* e *admin* como usuário e senha, respectivamente.
  - A API desenvolvida em NestJS pode ser acessada através da url `http://localhost:3030` e também é possível visualizar as rotas presentes na API acessando a documentação, em `http://localhost:3030/docs/`.

## Atividades

- [x] Atividade 1
  - [x] Configurar um aplicativo para acessar o banco de dados. Com as configurações que estão dentro do projeto docker-compose, Conectar e fazer uma query lá.(Navicat/MysqlWorkBench)
- [x] Atividade 2
  - [x] Enviar um print das extensões utilizadas em seu Editor(VSCode).
- [x] Atividade 3
  - [x] Fazer a rota get /cliente/${cliente}/gerar-vendas
  - [x] Caso o ID não for encontrado deve voltar um error
- [x] Atividade 4
  - [x] Fazer a rota POST /cliente/ salvar os dados de um cliente com os campos(nome,telefone,cpf) da tabela (cliente). E retornar qual foi o ID inserido.
  - [x] Caso não enviar o o CPF completo, com mascara, não deve salvar.
- [x] Atividade 5
  - [x] Fazer a rota PUT /cliente/{cliente} para atualizar o nome da Renata para "Juliana"
  - [x] Caso não enviar o o CPF completo, com mascara, não deve salvar.
  - [x] Caso não encontrar o cliente, retornar erro.
- [x] Atividade 6
  - [x] Fazer a atualização na rota Gerar Vendas /cliente/${cliente}/gerar-vendas?formato=excel para gerar um excel com as colunas abaixo: **Cliente Nome**, **Codigo Nota fiscal**, **Data Venda**, **Valor Total** (Colunas do excel)
  - [x] Ao executar a rota https://localhost:3030/arquivos/arquivo.xlsx ele retorna o download do excel
- [ ] Atividade 7
  - [ ] Fazer a rota GET /cliente/todas-vendas-pdf esta rota, mesma dos anteriores porém de todos os clientes com ou sem vendas, gerando em PDF.
  - [ ] Ao executar a rota https://localhost:3030/arquivos/arquivo.pdf ele retorna o download do pdf
- [ ] Atividade 8
- [ ] Atividade 9
  - [ ] Fazer uma api de validação, /cliente/1/validar-vendas
  - [ ] Caso enviar um cliente inexistente, retornar erro
- [x] Atividade 10
  - [x] Revisar o código, ver se pode reutilizar funções e duplicar o mínimo.
  - [x] Salvar o evidencias.doc.
  - [x] Antes de parar o docker, gerar o dump. `docker exec -it teste-mysql mysqldump -h'localhost' -uroot -p'root' --default-character-set=utf8 --routines --databases teste-app > teste-finalizado.sql`. O resultado deve ser um arquivo "teste-finalizado.sql" na raiz do projeto. Enviar ele para o git.
  - [x] Criar uma nova branch com seu nome e enviar os arquivos.