import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { URL } from 'url';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const LOREM_IPSUM_PARAGRAPHS = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
    "Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.",
    "Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.",
    "Nam porta, enim nonc, finibus nu, sed morf. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at val, una et lor. Ut non enim.",
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu.",
    "Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris."
];

const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    if (pathname === '/lorem') {
        const paragrafosQuery = parsedUrl.searchParams.get('paragrafos') || 1;
        const numParagrafos = parseInt(paragrafosQuery, 10);
        
        const resultado = [];
        for (let i = 0; i < numParagrafos; i++) {
            resultado.push(LOREM_IPSUM_PARAGRAPHS[i % LOREM_IPSUM_PARAGRAPHS.length]);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ paragrafos: resultado }));
        return; 
    }

    const requestedFile = pathname === '/' ? '/index.html' : pathname;
    const filePath = path.join('public', requestedFile);

    try {
        const data = await fs.readFile(filePath); 
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) contentType = 'text/css';
        if (filePath.endsWith('.js')) contentType = 'application/javascript';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Página não encontrada</h1>');
    }
});

const PORTA = process.env.PORT ?? 3000;

server.listen(PORTA, () => {
    console.log(`Servidor iniciado e escutando na porta ${PORTA}.`);
    console.log(`Acesse http://localhost:${PORTA} no seu navegador.`);
});