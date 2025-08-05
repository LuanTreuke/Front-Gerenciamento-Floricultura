# Front-Gerenciamento-Floricultura

## Descrição

Este projeto é um sistema completo para gestão de uma floricultura, desenvolvido como trabalho final da disciplina Web III.  
Inclui **front-end** (Next.js + React) e **back-end** (NestJS + Prisma), com funcionalidades de cadastro, edição, exclusão e listagem de produtos, pedidos e endereços.

Back-end: https://github.com/LuanTreuke/API-Floricultura-web-III

---

## Autor

- Luan Eduardo Treuke

---

## Tecnologias Utilizadas

- **Front-end:** Next.js, React, TailwindCSS, Axios
- **Back-end:** NestJS, Prisma ORM, MySQL
- **Outros:** TypeScript

---

## Como Executar

### 1. Instale as dependências

```bash
cd api-floricultura
npm install

cd ../front-floricultura
npm install
```

### 2. Configure o banco de dados

- Crie um banco MySQL chamado `floricultura`.
- Configure a variável `DATABASE_URL` no arquivo `.env` do back-end.

Exemplo:
```
DATABASE_URL="mysql://usuario:senha@localhost:3306/floricultura"
```

### 3. Rode as migrations do Prisma

```bash
cd api-floricultura
npx prisma migrate deploy
```

### 4. Inicie o back-end

```bash
npm run start:dev
```
O back-end ficará disponível em `http://localhost:4000`.

### 5. Inicie o front-end

```bash
cd ../front-floricultura
npm run dev
```
O front-end ficará disponível em `http://localhost:3000`.

---

## Funcionalidades

- **Produtos:** Cadastro, edição, exclusão, visualização com imagem.
- **Pedidos:** Cadastro, edição, exclusão, conclusão de entrega, filtro por status.
- **Endereços:** Cadastro, edição, exclusão.
- **Interface:** Tema branco, responsivo, navegação intuitiva.

---

## Observações

- O projeto utiliza CORS habilitado no back-end.
- As imagens dos produtos são exibidas via URL, que podem ser da internet, não precisam ser baixadas.
- O botão "✓" permite concluir entregas diretamente na listagem de pedidos.
