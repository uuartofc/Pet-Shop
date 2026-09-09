const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { app, escapeHtml } = require('../server.js');

describe('Server & Security Suite', () => {
    let server;
    let baseUrl;

    before((_, done) => {
        server = http.createServer(app);
        server.listen(0, () => {
            const port = server.address().port;
            baseUrl = `http://127.0.0.1:${port}`;
            done();
        });
    });

    after((_, done) => {
        server.close(done);
    });

    describe('HTML Sanitization (XSS Prevention)', () => {
        test('escapes HTML special characters properly', () => {
            const unsafeInput = '<script>alert("xss & risk")</script>\'test\'';
            const safeOutput = escapeHtml(unsafeInput);
            assert.strictEqual(
                safeOutput,
                '&lt;script&gt;alert(&quot;xss &amp; risk&quot;)&lt;/script&gt;&#039;test&#039;'
            );
        });

        test('handles empty or null values gracefully', () => {
            assert.strictEqual(escapeHtml(''), '');
            assert.strictEqual(escapeHtml(null), '');
            assert.strictEqual(escapeHtml(undefined), '');
        });
    });

    describe('HTTP Endpoints & Security Headers', () => {
        test('GET / responds with 200 and security headers', async () => {
            const response = await fetch(`${baseUrl}/`);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.headers.get('x-content-type-options'), 'nosniff');
            assert.strictEqual(response.headers.get('x-frame-options'), 'SAMEORIGIN');
            
            const html = await response.text();
            assert.ok(html.includes('Cão &amp; Gato') || html.includes('Cão & Gato'));
        });

        test('GET /style.css responds with 200 and css content-type', async () => {
            const response = await fetch(`${baseUrl}/style.css`);
            assert.strictEqual(response.status, 200);
            assert.ok(response.headers.get('content-type').includes('text/css'));
        });

        test('POST /enviar-contato returns 400 when required fields are missing', async () => {
            const payload = {
                nome: 'João',
                pet: 'Rex'
            };

            const response = await fetch(`${baseUrl}/enviar-contato`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            assert.strictEqual(response.status, 400);
            const text = await response.text();
            assert.ok(text.includes('Por favor, preencha todos os campos do formulário.'));
        });
    });
});
