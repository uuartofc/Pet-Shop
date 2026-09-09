require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const isPreviewPlaceholder = (value) => {
    if (!value) return true;
    const normalized = String(value).trim().toLowerCase();
    return ['123', 'example', 'changeme', 'your-email', 'your-app-password', 'placeholder', 'teste'].includes(normalized);
};

const hasEmailConfig = () => {
    return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS) &&
        !isPreviewPlaceholder(process.env.EMAIL_USER) &&
        !isPreviewPlaceholder(process.env.EMAIL_PASS);
};

// Security headers middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Middlewares para processar os dados do formulário HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const escapeHtml = (value) => {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// Rota POST para receber e enviar o formulário de contato
app.post('/enviar-contato', async (req, res) => {
    const { nome, email, telefone, pet, assunto, mensagem } = req.body;

    if (!nome || !email || !pet || !mensagem) {
        return res.status(400).send(`
            <div style="text-align:center; padding: 50px; font-family: sans-serif;">
                <h2>Por favor, preencha todos os campos do formulário.</h2>
                <a href="/">Voltar ao site</a>
            </div>
        `);
    }

    if (!hasEmailConfig()) {
        return res.status(503).send(`
            <div style="text-align:center; padding: 50px; font-family: sans-serif;">
                <h1 style="color: #d97706;">Preview ativo sem envio de e-mail.</h1>
                <p>Este projeto está em visualização e o formulário de contato foi desativado para não quebrar a página.</p>
                <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 5px;">Voltar ao site</a>
            </div>
        `);
    }

    // Configura o transporte de e-mail com as credenciais do .env
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Configurações do e-mail
    const mailOptions = {
        from: `"${nome}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Novo Contato PetShop - ${assunto || 'Mensagem geral'} - Pet: ${pet}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #ff6b6b;">Novo agendamento / dúvida recebida! 🐾</h2>
                <p><strong>Nome do Dono:</strong> ${escapeHtml(nome)}</p>
                <p><strong>E-mail de Contato:</strong> ${escapeHtml(email)}</p>
                <p><strong>WhatsApp:</strong> ${escapeHtml(telefone || 'Não informado')}</p>
                <p><strong>Nome do Pet:</strong> ${escapeHtml(pet)}</p>
                <p><strong>Assunto:</strong> ${escapeHtml(assunto || 'Não informado')}</p>
                <p><strong>Mensagem:</strong></p>
                <blockquote style="background: #f4f4f4; padding: 15px; border-left: 4px solid #ff6b6b; margin: 0;">
                    ${escapeHtml(mensagem)}
                </blockquote>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send(`
            <div style="text-align:center; padding: 50px; font-family: sans-serif;">
                <h1 style="color: #2e7d32;">Mensagem enviada com sucesso! 🐾</h1>
                <p>Em breve entraremos em contato para confirmar o atendimento do seu pet.</p>
                <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 5px;">Voltar ao site</a>
            </div>
        `);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send(`
            <div style="text-align:center; padding: 50px; font-family: sans-serif;">
                <h1 style="color: #d32f2f;">Ocorreu um erro ao enviar sua mensagem.</h1>
                <p>Por favor, verifique as configurações no arquivo .env e tente novamente.</p>
                <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 5px;">Voltar ao site</a>
            </div>
        `);
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🐾 Servidor do PetShop rodando em http://localhost:${PORT}`);
    });
}

module.exports = app;
module.exports.app = app;
module.exports.escapeHtml = escapeHtml;
