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
```

Na raiz do projeto, execute o comando `docker-compose up -d --build` para criar os conteiners necessários para a execução do projeto.
  - O serviço `sqlpad` foi adicionado para auxiliar nas consultas ao banco de dados (se trata de uma ferramenta visual como o MySQL Workbench). Ele pode ser acessado com `http://localhost:3000/signin`, utilizando *admin@sqlpad.com* e *admin* como usuário e senha, respectivamente.
  - A API desenvolvida em NestJS pode ser acessada através da url `http://localhost:3030` e também é possível visualizar as rotas presentes na API acessando a documentação, em `http://localhost:3030/docs/`.

**OBS**: O projeto foi finalizado por completo, cumprindo apenas até a Atividade 6.