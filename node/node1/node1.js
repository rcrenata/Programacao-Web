const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const util = require('./util');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const diretorioParaListar = process.argv[2];

if (!diretorioParaListar) {
    console.log('Erro: É necessário fornecer o nome de um diretório como parâmetro.');
    process.exit(1);
}

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        fs.readdir(diretorioParaListar, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('Erro ao ler o diretório.');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            
            let linkList = '';
            files.forEach(file => {
                linkList += util.createLink(file);
            });
            
            res.end(linkList);
        });
    } else { 
        const filePath = path.join(diretorioParaListar, url);

        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Arquivo não encontrado</h1>');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<a href="/">Voltar</a><br><br>'); // Adiciona o link "Voltar" [cite: 138]
            res.end(content);
        });
    }
});

const PORTA = process.env.PORT ?? 3000;

server.listen(PORTA, () => {
    console.log(`Servidor iniciado e escutando na porta ${PORTA}.`);
    console.log(`Acesse http://localhost:${PORTA} no seu navegador.`);
});