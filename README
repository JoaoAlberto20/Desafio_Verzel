<h1 align="center">
    <a href="#"> Desafio Verzel 🏆</a>
</h1>

<h4 align="center">
	 Status: Em Andamento
</h4>

<p align="center">
 <a href="#about">Sobre</a> •
 <a href="#instruções">Instruções para rodar a aplicação</a> •
 <a href="#endPoints">End Points</a> •
 <a href="#license">License</a>
</p>

<br />
<div id="about" />

## 💻 Sobre o desafio da aplicação:

Essa aplicação foi feita para um desafio de emprego para empresa [Verzel](https://verzel.com.br/). onde eu deveria criar uma aplicação Full-Stack, um CRUD com DJango No backend e com React no Front-End.

<br />

<details>
  <summary> 🖥️ Tecnologias Utilizadas no Backend</summary>
   <br />

   - PYTHON
   - DJANGO
   - DJANGO_RESTFRAMEWORK_SIMPLE_JWT
   - MYSQL
   - Docker
   - Jsonwebtoken

</details>
<br />
<details>
  <summary> 🖥️ Tecnologias Utilizadas no FrontEnd</summary>
   <br />

   - Next js
   - Typescript
   - SASS
   - Docker
   - Axios
   - Yup
   - React hook form
   - ESLint

</details>

<br />

<div id="instruções" />

## 🚀 Como executar o projeto.

<br />

Este projeto é divido em duas partes:
1. Backend (API)
2. Frontend

💡O Backend deve estar rodando em sua máquina para que o frontend seja renderizado

### Pré-requisitos

<br />

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

<br />

### 🎲 Rodando a aplicação por completo (Backend, Frontend)

Será necessário que a porta 3000 e 3001 estejam disponíveis para a aplicação, Postgresql usará a porta 5432 

1 - Clone o repositório em uma pasta de sua preferencia 
```
  $ git clone git@github.com:JoaoAlberto20/transfer-ngcash.git
  $ cd transfer-ngcash
```
2 - E suba o dockercompose, todas as depêndencias serão automaticamente instaladas
```
  ## este comando ira derrubar todas aplicações node no seu dispositivo recomendo rodar ele para continuar o processo
  $ killall node
  
  $ npm run compose:up:dev   // para subir a aplicação
```
3 - E entra na terminal do backend e rode o seguinte comando para subir as migrations
```
  $ docker exec -it backend bash
  $ npx prisma migrate dev
  $ exit // este comando  é pra sair do terminal do docker
```

4 - Após rodar os comando, aguarde um pouco que a aplicação irá ficar disponivel nas seguintes rotas:

```
  - Front End: http://localhost:3000

  - Back End: http://localhost:3001

  - Back End documentação : http://localhost:3001/api-docs
```

5 - E para parar a aplicação por completo  rode o seguinte comando 

```
  $ npm run compose:down:dev
```
---

<div id="endPoints" />

## 🎲 Endpoints do Back-End

<br />

## Criação e validação de usuário

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3001/users |
| `GET` | Verifica se o usuário possui um token valido | http://localhost:3001/users |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": "Username do usuário",
  "password": "senha_secreta"
  "confirmPassword": "e confirmação da senha_secreta"
}

```

#### Login de usuário

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3001/login |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": "Username do usuário",
  "password": "senha_secreta"
}

```

#### Balanço do usuário

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna o balanço da conta do usuário | http://localhost:3001/balance |


#### Transações

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Criação de uma transação | http://localhost:3001/transactions |
| `GET` | Retorna todos as transações que o usuário participou | http://localhost:3001/transactions |
| `GET` | Filtra as transação por tipo e/ou data da transação | http://localhost:3001/transactions/filter?type=type&date=date |

Nessa requisição POST é necessário informar o seguinte JSON:

```
{
  "username": FulanoDeTal, // Esse valor e referente para qual usuário que você ira enviar a transação
  "value": 25.25, // O valor da transação deve ser em decimal ou Inteiro.
}

```

e na requisição GET para FILTRAR as transações você deve passar  as seguintes QUERY:

```
{
  "type": all || cash-in || cash-out,
  "date": Data da criação da transação
}
```

<div id="license" />

## 📝 License

This project is under the license [MIT](./LICENSE).

Made with ❤️ by João Alberto [Get in Touch!](https://www.linkedin.com/in/joaoalbertosvcode)

---