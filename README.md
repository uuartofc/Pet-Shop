# 🐾 PetShop Landing Page

Landing page responsiva e completa para PetShop desenvolvida com **Node.js**, **Express** e integração de formulário de contato via **Nodemailer**.

## 🚀 Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos para execução:

1. **Descompactar o projeto** e abrir a pasta no terminal.
2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar o arquivo `.env`:**
   - Crie um arquivo `.env` baseado no `.env.example`:
     ```env
     EMAIL_USER=seu-email@gmail.com
     EMAIL_PASS=sua-senha-de-aplicativo
     PORT=3000
     ```
   - *Atenção:* Para Gmail, utilize uma **Senha de Aplicativo** (gerada na sua conta do Google em Segurança > Verificação em duas etapas > Senhas de app).

4. **Rodar o servidor:**
   ```bash
   npm start
   ```

5. **Acessar a landing page:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
