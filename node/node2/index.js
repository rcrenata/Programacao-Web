import http from 'http';
import fs from 'fs/promises'; // Usando a versão de Promises do 'fs'
import path from 'path';
import dotenv from 'dotenv';

import { createLink } from './util.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const diretorioParaListar = process.argv[2];

if (!diretorioParaListar) {
    console.log('Erro: É necessário fornecer o nome de um diretório como parâmetro.');
    process.exit(1);
}

const server = http.createServer(async (req, res) => {
    const url = req.url;

    try {
        if (url === '/') {
            const files = await fs.readdir(diretorioParaListar);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            const linkList = files.map(file => createLink(file)).join('');
            res.end(linkList);
        } else {
            const filePath = path.join(diretorioParaListar, url);
            const content = await fs.readFile(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<a href="/">Voltar</a><br><br>');
            res.end(content);
        }
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Arquivo ou diretório não encontrado</h1>');
    }
});

const PORTA = process.env.PORT ?? 3000;

server.listen(PORTA, () => {
    console.log(`Servidor iniciado e escutando na porta ${PORTA}.`);
    console.log(`Acesse http://localhost:${PORTA} no seu navegador.`);
});