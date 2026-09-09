# Ninho Pet Care

Preview responsivo para pet shop desenvolvido com **Node.js**, **Express** e uma interface demonstrativa para cães e gatos.

O preview inclui abas de cuidado, loja e agendamento mensal, carrinho de compras, login demonstrativo e persistência local no navegador. Não há pagamentos, cartões, contas reais ou envio de dados de clientes nesta etapa.

## 🚀 Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos para execução:

1. **Clonar o projeto** e abrir a pasta no terminal.
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

## Deploy de preview

O projeto mantém `vercel.json` para deploy com `@vercel/node`. O backend não envia e-mails quando as credenciais não estão configuradas, evitando efeitos reais durante a fase de preview.
